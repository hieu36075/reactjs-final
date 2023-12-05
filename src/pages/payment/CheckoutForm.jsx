import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({onStripeElementsSet}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handelEmailChange=(e)=>{
    setEmail(e.value)
  }
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (stripe && elements) {
      onStripeElementsSet(stripe, elements);
    }
  }, [stripe, elements, onStripeElementsSet]);


  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" >
      <LinkAuthenticationElement
        id="link-authentication-element"
        value={email}
        onChange={handelEmailChange}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}