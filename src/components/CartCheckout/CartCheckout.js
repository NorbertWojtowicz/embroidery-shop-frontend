import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./CartCheckout.css";
import API_URL from "../../Config/API_URL";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import cookieUtil from "../../CookieUtil/CookieUtil";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51KeLXODOTmQM2zMXnuTJUUXr05q4GXllOlfawoKa3VGfoLsETkqV6cvCnzkjf2WXD6wzlnNlZYyu9w1sSwO8yiRD00oiYOXwTZ"
);

const CartCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function fetchData() {
      await axiosApiInstance
        .post(API_URL + "/payment/create")
        .then((res) => setClientSecret(res.data));
      await axiosApiInstance
        .get(API_URL + "/cart")
        .then((res) => setCartItems(res.data))
        .catch();
    }
    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="CartCheckout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cartItems={cartItems} clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CartCheckout;
