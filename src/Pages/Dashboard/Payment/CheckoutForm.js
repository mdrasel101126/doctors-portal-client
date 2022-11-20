import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, email, patientName } = booking;
  const [clientSecret, setClientSecret] = useState("");
  /* useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("doctorAccessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret));
  }, [price]); */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm mt-4 btn-primary ml-4"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
