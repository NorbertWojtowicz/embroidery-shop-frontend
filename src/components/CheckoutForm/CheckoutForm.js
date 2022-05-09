import React, { useState, useEffect, Fragment } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import API_URL from "../../Config/API_URL";
import SuccessMessage from "../ErrorContainers/SuccessMessage/SuccessMessage";

export default function CheckoutForm({ cartItems, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(clientSecret);

  async function finalizeOrder() {
    await axiosApiInstance.post(API_URL + "/cart/finalize");
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const secretFromParams = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!secretFromParams) {
      return;
    }

    stripe.retrievePaymentIntent(secretFromParams).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          finalizeOrder();
          setMessage(
            "Płatność zaakceptowana! W razie jakichkolwiek pytań proszę o kontakt (sposoby kontaktu są dostępne w stopce poniżej)"
          );
          break;
        case "processing":
          setMessage("Twoja płatność jest przetwarzana.");
          break;
        case "requires_payment_method":
          setMessage("Twoja płatność się nie powiodła, spróbuj ponownie.");
          break;
        default:
          setMessage("Coś poszło nie tak.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const detailsForm = document.querySelector("#payment-form");

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: API_URL + "/zamowienie",
        payment_method_data: {
          billing_details: {
            address: {
              city: "Miasto: " + detailsForm.city.value,
              line1: "Ulica: " + detailsForm.street.value,
              postal_code: "Kod pocztowy: " + detailsForm.postCode.value,
              line2:
                "Uwagi do zamówienia: " +
                (detailsForm.addInfo.value === ""
                  ? "Brak"
                  : detailsForm.addInfo.value),
            },
            phone: detailsForm.phone.value,
            name:
              detailsForm.firstName.value + " " + detailsForm.lastName.value,
          },
        },
      },
      // redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <Fragment>
      {message !== null ? <SuccessMessage message={message} /> : ""}
      <form id="payment-form" onSubmit={handleSubmit}>
        <h3>Adres wysyłki</h3>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Imię
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="firstName"
            required={true}
          />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Nazwisko
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="lastName"
            required={true}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Miasto
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="city"
            required={true}
          />
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Kod pocztowy
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="postCode"
            required={true}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Ulica i numer
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="street"
            required={true}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Nr telefonu
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name="phone"
            required={true}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend" style={{ height: "60px" }}>
            <span
              className="input-group-text"
              id="inputGroup-sizing-sm"
              style={{ height: "60px" }}
            >
              Uwagi do zamówienia
            </span>
          </div>

          <textarea
            className="form-control"
            aria-label="Small"
            style={{ height: "60px" }}
            aria-describedby="inputGroup-sizing-sm"
            name="addInfo"
            required={false}
          />
        </div>
        <h4>
          Płatność - kwota:{" "}
          {cartItems.reduce((prev, cur) => prev + cur.subtotal, 0.0)} zł (+15zł
          wysyłka, kurier DPD)
        </h4>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner" />
            ) : (
              "Zapłać teraz"
            )}
          </span>
        </button>
      </form>
    </Fragment>
  );
}
