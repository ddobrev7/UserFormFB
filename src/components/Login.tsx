import React, { useState, useEffect, Suspense } from "react";
import "../styles/Login.css";
import { isUserNameValid, isPasswordValid } from "./Validators";
import { simulateNetworkDelay } from "./DelaySimulation";
import config from "../config";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

export type FormState = {
  uname: string;
  pass: string;
};

export type FormErrors = {
  uname?: string;
  pass?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    uname: localStorage.getItem("uname") || "",
    pass: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("uname");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, uname: storedEmail }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Validate the input and update errors
    const errors: FormErrors = {};
    if (!isUserNameValid(updatedFormData.uname)) {
      errors.uname = "Please enter a valid username";
    }
    if (!isPasswordValid(updatedFormData.pass)) {
      errors.pass = "Please enter a valid password";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await simulateNetworkDelay(config.timeoutInMiliseconds);
      navigate("/SuccessPage", {
        state: { uname: formData.uname },
      });


    setIsLoading(false);
  };

  return (
    <div className="rectangle3">
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="login">
            <div className="group10">
              <div className="sign-in-text">
                SIGN IN TO YOUR ACCOUNT {config.apiUrl}
              </div>
            </div>
            <LoginForm
              formData={formData}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isFormValid={isFormValid}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Login;
