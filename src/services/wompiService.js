// Wompi Payment Gateway Integration (Colombia - PSE, Nequi, Tarjetas, Bancolombia, Efecty)

const WOMPI_PUBLIC_KEY = import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_test_BxqdnnJ5nBqjJ4EOgnB75bTyjog6uLhL';
const WOMPI_INTEGRITY_SECRET = import.meta.env.VITE_WOMPI_INTEGRITY_SECRET || 'test_integrity_2DuweczveeZzwcDUYGNUmG3TikImzHNK';
const WOMPI_WIDGET_SCRIPT_URL = 'https://checkout.wompi.co/widget.js';

/**
 * Genera la firma de integridad SHA-256 requerida por Wompi
 * Cadena concatenada: (referencia + montoEnCentavos + moneda + secretoIntegridad)
 */
async function generateIntegritySignature(reference, amountInCents, currency = 'COP', secret = WOMPI_INTEGRITY_SECRET) {
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

  // Launch official Wompi Checkout Widget - STRICT PAYMENT VERIFICATION & 1 CUOTA DEFAULT
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
    const effectiveAmountCop = Math.max(1500, Number(amountInCop) || 1500);
    const amountInCents = Math.round(effectiveAmountCop * 100);
    const currency = 'COP';

    try {
      await this.loadScript();

      const integrityHash = await generateIntegritySignature(reference, amountInCents, currency, WOMPI_INTEGRITY_SECRET);

      const cleanPhone = (customerPhoneNumber || '').replace(/\D/g, '').slice(-10) || '3000000000';
      const cleanDni = (customerDni || '').replace(/\D/g, '') || '1098765432';

      if (window.WidgetCheckout) {
        const checkoutOptions = {
          currency: currency,
          amountInCents: amountInCents,
          reference: reference,
          publicKey: WOMPI_PUBLIC_KEY,
          redirectUrl: window.location.href,
          defaultInstallments: 1, // Pago de una sola cuota (sin cuotas)
          customerData: {
            email: customerEmail,
            fullName: customerFullName,
            phoneNumber: cleanPhone,
            phoneNumberPrefix: '+57',
            legalId: cleanDni,
            legalIdType: 'CC'
          }
        };

        if (integrityHash) {
          checkoutOptions.signature = {
            integrity: integrityHash
          };
        }

        const checkout = new window.WidgetCheckout(checkoutOptions);
        let handled = false;

        checkout.open((result) => {
          if (handled) return;
          handled = true;

          const transaction = result?.transaction;

          // REGLA DE SEGURIDAD STRICTA: La boleta ÚNICAMENTE se emite si la transacción fue APROBADA
          if (transaction && transaction.status === 'APPROVED') {
            onSuccess(transaction);
          } else {
            onError(transaction || { status: 'NOT_APPROVED', message: 'La transacción no fue aprobada por el banco.' });
          }
        });

      } else {
        // Fallback Web Checkout URL
        const redirectUrl = encodeURIComponent(window.location.href);
        let checkoutUrl = `https://checkout.wompi.co/p/?public-key=${WOMPI_PUBLIC_KEY}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&redirect-url=${redirectUrl}`;
        if (integrityHash) {
          checkoutUrl += `&signature:integrity=${integrityHash}`;
        }
        window.open(checkoutUrl, '_blank');
        
        onError({ status: 'REDIRECTED', message: 'Comprueba el estado de la transacción en tu banco.' });
      }
    } catch (err) {
      console.error('Error inicializando Wompi:', err);
      onError({ status: 'ERROR', message: 'Error al conectar con Wompi. La boleta no ha sido emitida.' });
    }
  }
};
