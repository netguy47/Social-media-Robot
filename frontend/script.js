const buttons = document.querySelectorAll('.cta-button');

buttons.forEach(button => {
  button.addEventListener('click', async (e) => {
    const priceId = e.target.dataset.priceId;
    const token = 'YOUR_JWT_HERE'; // Replace with a real JWT

    const res = await fetch('/api/v1/billing/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ priceId }),
    });

    const { id } = await res.json();

    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your Stripe public key
    stripe.redirectToCheckout({ sessionId: id });
  });
});
