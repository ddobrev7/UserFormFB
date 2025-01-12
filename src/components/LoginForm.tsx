import React from "react";
import { FormState, FormErrors } from "./Login";
import { InputComp } from "./Input";

type LoginFormProps = {
  formData: FormState;
  formErrors: FormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isFormValid: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  formErrors,
  handleInputChange,
  handleSubmit,
  isFormValid,
}) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="group12">
        <div className="rectangle6">
          <InputComp
            Id="uname"
            InputPlaceholder="Username"
            InputName="uname"
            value={formData.uname}
            onChangeA={handleInputChange}
            InputClassName="txtinput"
            autoComplete="on"
          />
          {formErrors.uname && <div className="error_message">{formErrors.uname}</div>}
        </div>
        <div className="rectangle7">
          <InputComp
            Id="pass"
            InputName="pass"
            InputType="password"
            InputPlaceholder="Password"
            value={formData.pass}
            onChangeA={handleInputChange}
            InputClassName="txtinput"
            autoComplete="on"
          />
          {formErrors.pass && <div className="error_message">{formErrors.pass}</div>}
        </div>
      </div>
      <button
        type="submit"
        className="login-now_1"
        disabled={!isFormValid} 
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
