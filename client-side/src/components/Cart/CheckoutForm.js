import React, { useState } from "react";
import CheckoutOverview from "./CheckoutOverview";
import Delivery from "./Delivery";

import Login from "../Login";
import Register from "../Register";

import "./CheckoutForm.css";

function CheckoutForm() {
  const userToken = localStorage.getItem("token");
  const [getToken, setGetToken] = useState(userToken);

  const [step, setStep] = useState(0);
  const [inputData, setInputData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    street: "",
    zipcode: "",
    city: "",
  });

  const CheckoutForms = ["Overview", "Contact", "Choose Delivery Method"];

  const DisplayCurrentStep = () => {
    const [showRegModal, setShowRegModal] = useState(false);
    const showModalRegHandler = () => {
      setShowRegModal(true);
    };
    const hideModalRegHandler = () => {
      setShowRegModal(false);
      step === 2;
    };

    const [showLoginModal, setShowLoginModal] = useState(false);
    const showModalLoginHandler = () => {
      setShowLoginModal(true);
    };
    const hideModalHandler = () => {
      setShowLoginModal(false);
      step === 2;
    };

    if (step === 0) {
      return <CheckoutOverview></CheckoutOverview>;
    } else if (step === 1 && !userToken) {
      return (
        <div className="reg-login">
          {showRegModal && (
            <Register
              onCloseReg={hideModalRegHandler}
              onSubmit={() => showRegModal(false)}
            />
          )}
          {showLoginModal && (
            <Login
              onCloseLogin={hideModalHandler}
              onSubmit={() => showLoginModal(false)}
            />
          )}
          <button onClick={showModalRegHandler} className="btn-reg">
            REGISTER
          </button>
          <button onClick={showModalLoginHandler} className="btn-reg">
            SIGN IN
          </button>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="reg-login">
          <h1>You are logged in as{}</h1>
        </div>
      );
    } else if (step === 2) {
      return <Delivery></Delivery>;
    }
  };
  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{
            width:
              step === 0
                ? "25%"
                : step === 1
                ? "50%"
                : step === 2
                ? "75%"
                : "100%",
          }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{CheckoutForms[step]}</h1>
        </div>
        <div className="body">{DisplayCurrentStep()}</div>
        <div className="checkout-footer">
          <button
            disabled={step === 0}
            onClick={() => {
              setStep((currStep) => currStep - 1);
            }}
          >
            Prev
          </button>
          <button
            hidden={step === CheckoutForms.length - 1}
            onClick={() => {
              setStep((currStep) => currStep + 1);
            }}
          >
            {step === 0 ? "Confirm Items" : step === 1 ? "Delivery" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
