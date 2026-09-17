// Wompi Payment Gateway Integration (Colombia - PSE, Nequi, Tarjetas, Bancolombia, Efecty)

const getWompiPublicKey = () => {
  return localStorage.getItem('eclipse_wompi_public_key') || import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_BxqdnnJ5nBqjJ4EOgnB75bTyjog6uLhL';
};

const getWompiIntegritySecret = () => {
  return localStorage.getItem('eclipse_wompi_integrity_secret') || import.meta.env.VITE_WOMPI_INTEGRITY_SECRET || 'test_integrity_2DuweczveeZzwcDUYGNUmG3TikImzHNK';
};

const WOMPI_WIDGET_SCRIPT_URL = 'https://checkout.wompi.co/widget.js';

/**
 * Genera la firma de integridad SHA-256 requerida por Wompi
 * Cadena concatenada: (referencia + montoEnCentavos + moneda + secretoIntegridad)
 */
async function generateIntegritySignature(reference, amountInCents, currency = 'COP', secret = getWompiIntegritySecret()) {
  if (!secret) return null;
  try {
    const rawString = `${reference}${amountInCents}${currency}${secret}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(rawString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Error generando firma de integridad Wompi:', err);
    return null;
  }
}

export const wompiService = {
  // Check if current Wompi keys are in sandbox/test mode
  isSandboxMode() {
    return getWompiPublicKey().startsWith('pub_test_');
  },

  // Load Wompi Widget Script dynamically
  loadScript() {
    return new Promise((resolve, reject) => {
      if (document.getElementById('wompi-widget-script')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'wompi-widget-script';
      script.src = WOMPI_WIDGET_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Wompi script'));
      document.body.appendChild(script);
    });
  },

  // Generate official Wompi Web Checkout standalone URL
  async buildWebCheckoutUrl({ amountInCop, reference, customerEmail, customerFullName, customerDni, integritySecret = getWompiIntegritySecret() }) {
    const publicKey = getWompiPublicKey();
    const effectiveAmountCop = Math.max(1500, Number(amountInCop) || 1500);
    const amountInCents = Math.round(effectiveAmountCop * 100);
    const currency = 'COP';
    const redirectUrl = encodeURIComponent(window.location.origin + window.location.pathname);

    const integrityHash = await generateIntegritySignature(reference, amountInCents, currency, integritySecret);
    
    let url = `https://checkout.wompi.co/p/?public-key=${publicKey}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&redirect-url=${redirectUrl}`;
    if (integrityHash) {
      url += `&signature:integrity=${integrityHash}`;
    }
    if (customerEmail) {
      url += `&customer-data:email=${encodeURIComponent(customerEmail)}`;
    }
    if (customerFullName) {
      url += `&customer-data:full-name=${encodeURIComponent(customerFullName)}`;
    }
    if (customerDni) {
      url += `&customer-data:legal-id=${encodeURIComponent(customerDni)}&customer-data:legal-id-type=CC`;
    }
    return url;
  },

  // Query Wompi API to verify transaction status by ID
  async verifyTransaction(transactionId) {
    if (!transactionId) return null;
    const publicKey = getWompiPublicKey();
    const isTest = publicKey.startsWith('pub_test_');
    const baseUrl = isTest ? 'https://sandbox.wompi.co/v1' : 'https://production.wompi.co/v1';

    try {
      const response = await fetch(`${baseUrl}/transactions/${transactionId}`);
      if (!response.ok) {
        console.warn(`Wompi API error HTTP ${response.status}`);
        return null;
      }
      const json = await response.json();
      return json?.data || null;
    } catch (err) {
      console.error('Error verificando transacción Wompi:', err);
      return null;
    }
  },

  // Launch official Wompi Checkout - Direct Full Portal Redirection (Fail-safe, 0 JS errors)
  async openCheckout({
    amountInCop,
    reference,
    customerEmail,
    customerFullName,
    customerPhoneNumber,
    customerDni,
    onSuccess,
    onError
  }) {
    const publicKey = getWompiPublicKey();
    const integritySecret = getWompiIntegritySecret();

    // Wompi API minimum threshold in Colombia is 1,500 COP (150,000 cents)
    const effectiveAmountCop = Math.max(1500, Number(amountInCop) || 1500);
    const cleanDni = (customerDni || '').replace(/\D/g, '') || '1098765432';

    try {
      // Save pending purchase details in local session for redirect verification
      sessionStorage.setItem('eclipse_pending_ref', reference);
      sessionStorage.setItem(`eclipse_pending_info_${reference}`, JSON.stringify({
        customerEmail,
        customerFullName,
        customerDni: cleanDni,
        amountInCop: effectiveAmountCop
      }));

      // Direct Web Checkout Redirection to Wompi official payment portal
      const checkoutUrl = await this.buildWebCheckoutUrl({
        amountInCop: effectiveAmountCop,
        reference,
        customerEmail,
        customerFullName,
        customerDni: cleanDni,
        integritySecret
      });

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Error inicializando Wompi:', err);
      onError({ status: 'ERROR', message: 'Error al conectar con Wompi. La boleta no ha sido emitida.' });
    }
  }
};
