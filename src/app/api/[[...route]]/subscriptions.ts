// import express from "express";
// import Stripe from "stripe";
// import { PrismaClient } from "@prisma/client";
// import { checkIsActive } from "@/features/subscriptions/lib";
// import { stripe } from "@/lib/stripe";

// // Initialize Prisma client
// const prisma = new PrismaClient();
// const app = express();
// app.use(express.json());

// const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// // Middleware to verify authentication (similar to verifyAuth in Hono)
// const verifyAuth = (req:any, res:any, next:any) => {
//   const authUser = req.user; // Assuming req.user is populated with the token info
//   if (!authUser || !authUser.id) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   next();
// };

// // POST /billing
// app.post("/billing", verifyAuth, async (req:any, res:any) => {
//   const auth = req.user; // req.user is assumed to contain auth token data

//   const subscription = await prisma.subscription.findFirst({
//     where: { userId: auth.id },
//   });

//   if (!subscription) {
//     return res.status(404).json({ error: "No subscription found" });
//   }

//   const session = await stripe.billingPortal.sessions.create({
//     customer: subscription.customerId,
//     return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
//   });

//   if (!session.url) {
//     return res.status(400).json({ error: "Failed to create session" });
//   }

//   res.json({ data: session.url });
// });

// // GET /current
// app.get("/current", verifyAuth, async (req, res) => {
//   const auth = req.user;

//   const subscription = await prisma.subscription.findFirst({
//     where: { userId: auth.id },
//   });

//   const active = checkIsActive(subscription);

//   res.json({
//     data: {
//       ...subscription,
//       active,
//     },
//   });
// });

// // POST /checkout
// app.post("/checkout", verifyAuth, async (req, res) => {
//   const auth = req.user;

//   const session = await stripe.checkout.sessions.create({
//     success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
//     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
//     payment_method_types: ["card", "paypal"],
//     mode: "subscription",
//     billing_address_collection: "auto",
//     customer_email: auth.email || "",
//     line_items: [
//       {
//         price: process.env.STRIPE_PRICE_ID,
//         quantity: 1,
//       },
//     ],
//     metadata: {
//       userId: auth.id,
//     },
//   });

//   if (!session.url) {
//     return res.status(400).json({ error: "Failed to create session" });
//   }

//   res.json({ data: session.url });
// });

// // POST /webhook
// app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
//   const signature = req.headers["stripe-signature"];
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, signature!, stripeSecret);
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid signature" });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;

//   if (event.type === "checkout.session.completed") {
//     const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

//     if (!session?.metadata?.userId) {
//       return res.status(400).json({ error: "Invalid session" });
//     }

//     await prisma.subscription.create({
//       data: {
//         status: subscription.status,
//         userId: session.metadata.userId,
//         subscriptionId: subscription.id,
//         customerId: subscription.customer as string,
//         priceId: subscription.items.data[0].price.product as string,
//         currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//   }

//   if (event.type === "invoice.payment_succeeded") {
//     const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

//     if (!session?.metadata?.userId) {
//       return res.status(400).json({ error: "Invalid session" });
//     }

//     await prisma.subscription.update({
//       where: { subscriptionId: subscription.id },
//       data: {
//         status: subscription.status,
//         currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//         updatedAt: new Date(),
//       },
//     });
//   }

//   res.status(200).json({});
// });

// export default app;
