// import {
//   PayPalScriptProvider,
//   PayPalHostedFieldsProvider,
//   PayPalHostedField,
//   PayPalButtons,
// } from "@paypal/react-paypal-js";

// import { useEffect, useState } from "react";

// const PayPalCardFields = ({ setComplete, pret }) => {
//   const [orderId, setOrderId] = useState(null);

//   const createOrder = async () => {
//     const res = await fetch("http://localhost:3001/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ total: pret }),
//     });
//     const data = await res.json();
//     setOrderId(data.id);
//     return data.id;
//   };

//   const capture = async () => {
//     const res = await fetch("http://localhost:3001/capture-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId }),
//     });
//     const data = await res.json();
//     console.log(data.status);
//     setComplete((old) => ({ ...old, [3]: true }));
//     alert("Transaction complete: " + data.status);
//   };
//   const [clientToken, setClientToken] = useState(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     fetch("http://localhost:3001/generate-client-token")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setClientToken(data.clientToken);
//       });
//   }, []);
//   const onError = (err) => {
//     console.error("PayPal Error:", err);
//     setError("An error occurred during payment processing. Please try again.");
//   };
//   if (!clientToken) return <div>Loading...</div>;
// //   return (
// //     <section className="mainform">
// //       <PayPalScriptProvider
// //         options={{
// //           "client-id": "sb",
// //           dataClientToken: clientToken,
// //           components: "buttons,hosted-fields",
// //           "enable-funding": "card",
// //         }}
// //       >
// //         <PayPalHostedFieldsProvider createOrder={createOrder}>
// //           <div className="content">
// //             <div className="input">
// //               <label>
// //                 <h4>Card Number</h4>
// //                 <PayPalHostedField
// //                   id="card-number"
// //                   hostedFieldType="number"
// //                   options={{
// //                     selector: "#card-number",
// //                     placeholder: "4111 1111 1111 1111",
// //                   }}
// //                 />
// //               </label>
// //             </div>
// //             <div className="input">
// //               <label>
// //                 <h4>Expiration Date</h4>
// //                 <PayPalHostedField
// //                   id="expiration-date"
// //                   hostedFieldType="expirationDate"
// //                   options={{
// //                     selector: "#expiration-date",
// //                     placeholder: "MM/YY",
// //                   }}
// //                 />
// //               </label>
// //             </div>
// //             <div className="input">
// //               <label>
// //                 <h4>CVV</h4>
// //                 <PayPalHostedField
// //                   id="cvv"
// //                   hostedFieldType="cvv"
// //                   options={{ selector: "#cvv", placeholder: "123" }}
// //                 />
// //               </label>
// //             </div>

// //             <PayPalButtons
// //               style={{ layout: "horizontal" }}
// //               fundingSource="card"
// //               createOrder={createOrder}
// //               onApprove={capture}
// //             />
// //           </div>
// //         </PayPalHostedFieldsProvider>
// //       </PayPalScriptProvider>
// //     </section>
// //   );

// };

// export default PayPalCardFields;
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
      // console.log("dataRes.id: ", dataRes.id);
      setOrderId(dataRes.id);
      return dataRes.id;
    } catch (err) {
      // console.log("eroare:", err);
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
      // console.log("status: ", dataRes.status);
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
      <PayPalScriptProvider
        options={{
          "client-id": "sb",
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
