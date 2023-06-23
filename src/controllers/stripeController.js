const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { donation } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: donation,
    currency: 'usd',
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
