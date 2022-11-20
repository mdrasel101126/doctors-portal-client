import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  //console.log(booking);
  const { appointmentDate, price, slot, treatmentName } = booking;
  return (
    <div>
      <h1 className="text-3xl">Payment for {treatmentName}</h1>
      <p className="text-xl">
        Please pay <strong>{price}</strong> for your appointment on
        <strong>{appointmentDate}</strong> at <strong>{slot}</strong>
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
