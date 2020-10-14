const express = require("express");
const app = express();

require("dotenv").config();

// Initialize stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.post("/stripe-checkout", async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "T-shirt",
						},
						unit_amount: 2000,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `https://example.com/success`,
			cancel_url: `https://example.com/cancel`,
		});

		res.json({ id: session.id });
	} catch (error) {
		// an error handler "really" should be used instead but:
		console.log(error);
	}
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log(
		`Server is alive and kicking at http://localhost:${process.env.PORT}`
	);
});
