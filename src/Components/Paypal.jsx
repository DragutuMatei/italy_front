import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast_error, toast_success } from "./Toasts";

const PayPalPayment = ({ setComplete, next, setPayRasp, pret }) => {
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const createOrder = async (data, actions) => {
    if (pret == 0) {
      toast_error("Alege o masina!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_LINK}/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ total: pret }), // De exemplu, 100 USD
        }
      );
      const dataRes = await res.json();
      setOrderId(dataRes.id);
      return dataRes.id;
    } catch (err) {
      setError("Error creating order.");
      return null;
    }
  };

  const captureOrder = async (data, actions) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_LINK}/capture-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );
      const dataRes = await res.json();
      setPayRasp(dataRes);
      setComplete((old) => ({ ...old, [3]: true }));
      next(1, true);
      toast_success("Transaction complete: " + dataRes.status);
    } catch (err) {
      toast_error("Eroare: ", err);
      // console.log("err: ", err);
      setError("Error capturing order.");
    }
  };
  const [clientToken, setClientToken] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_LINK}/generate-client-token`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClientToken(data.clientToken);
      });
  }, []);
  return (
    <div>
      {clientToken && (
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL,
            currency: "EUR",
            dataClientToken: clientToken,
            components: "buttons,hosted-fields",
            "enable-funding": "card",
          }}
        >
          <div>
            <div id="dropin-container" />
            <PayPalButtons
              createOrder={createOrder}
              onApprove={captureOrder}
              onError={() =>
                setError(
                  "An error occurred during payment processing. Please try again."
                )
              }
            />
          </div>
        </PayPalScriptProvider>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <style>{`
        .paypal-button {
          cursor: pointer;
          font-weight: 500;
          left: 3px;
          line-height: inherit;
          position: relative;
          text-decoration: none;
          text-align: center;
          border-style: solid;
          border-width: 1px;
          border-radius: 3px;
          -webkit-appearance: none;
          -moz-appearance: none;
          display: inline-block;
        }

        .button--small {
          padding: 10px 20px;
          font-size: 0.875rem;
        }

        .button--green {
          outline: none;
          background-color: #64d18a;
          border-color: #64d18a;
          color: white;
          transition: all 200ms ease;
        }

        .button--green:hover {
          background-color: #8bdda8;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default PayPalPayment;
