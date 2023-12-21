import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/libs/apis";

// Define the event type to handle
const checkout_session_completed = "checkout.session.completed";

// Initialize Stripe with the provided secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

/**
 * Handle incoming POST requests to the webhook endpoint.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 */
export async function POST(req: Request, res: Response) {
  // Extract request body, Stripe signature, and webhook secret
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Define Stripe event object
  let event: Stripe.Event;

  try {
    // Verify the Stripe signature and construct the event
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    // Return a NextResponse with an error message if verification fails
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }
  //   console.log(event);
  // Handle the received event type
  switch (event.type) {
    case checkout_session_completed:
      //   Extract relevant data from the event payload's metadata
      const session = event.data.object;
      console.log(session);
      const {
        // @ts-ignore
        metadata: {
          adults,
          checkinDate,
          checkoutDate,
          children,
          hotelRoom,
          numberOfDays,
          user,
          discount,
          totalPrice,
        },
      } = session;

      //   Create a booking based on the received information
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      // Update the hotel room information
      await updateHotelRoom(hotelRoom);

      // Return a success message for a successful booking
      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      // Log a message for unhandled event types
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response indicating the event has been received
  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
