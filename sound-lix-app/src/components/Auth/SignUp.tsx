"use client";

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { createUser, getUser } from "@/app/actions/dbAction";
import TextField from "../Common/TextField";

type State = {
  email: { value: string };
  username: { value: string };
  password: {
    value: string;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasMinLength: boolean;
  };
};

const initialState: State = {
  email: { value: "" },
  username: { value: "" },
  password: {
    value: "",
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
  },
};

const steps = ["Email", "Password", "Username", "Confirm"];

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        hasUppercase: /[A-Z]/.test(state.password.value),
        hasLowercase: /[a-z]/.test(state.password.value),
        hasNumber: /\d/.test(state.password.value),
        hasMinLength: state.password.value?.length >= 10,
      },
    }));
  }, [state.password.value]);

  const nextStep = async () => {
    if (!validateCurrentStep()) return;

    if (step === 0) {
      const user = await getUser({ filter: "email", value: state.email.value });
      if (user.id) {
        setError("This email is already linked to an existing account.");
        return;
      }
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
      setError("");
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        state.email.value,
        state.password.value
      );
      await createUser(
        credentials.user.uid,
        state.email.value,
        state.username.value
      );
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const validateCurrentStep = (): boolean => {
    let result = {
      isValid: true,
      errorMsg: "",
    };

    switch (step) {
      case 0:
        result = {
          isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.value),
          errorMsg:
            "This email is invalid. Make sure it's written like example@email.com",
        };
        break;
      case 1:
        result = {
          isValid:
            state.password.hasNumber &&
            state.password.hasLowercase &&
            state.password.hasUppercase &&
            state.password.hasMinLength,
          errorMsg: "Invalid password",
        };
        break;
      case 2:
        result = {
          isValid: state.username.value.trim().length >= 3,
          errorMsg: "Invalid username",
        };
        break;
      default:
        throw new Error("Invalid step");
    }

    setError(result.isValid ? "" : result.errorMsg);

    return result.isValid;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {step === 0 && "Sign up to start listening"}
          {step === 1 && "Create a password"}
          {step === 2 && "Pick a username"}
          {step === 3 && "Confirm and create account"}
        </h2>

        {step === 0 && (
          <>
            <TextField
              type="email"
              name="email"
              label="Email Address"
              value={state.email.value}
              placeholder="example@email.com"
              msgText={error}
              validate={validateCurrentStep}
              onChange={(e) => {
                setState((prev) => ({
                  ...prev,
                  email: {
                    value: e.target.value,
                  },
                }));
              }}
            />
          </>
        )}

        {step === 1 && (
          <>
            <TextField
              type="password"
              name="password"
              label="Password"
              value={state.password.value}
              validate={validateCurrentStep}
              placeholder="••••••••"
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    value: e.target.value,
                  },
                }))
              }
            />
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Your password must contain at least:
                </span>
                <ul className="mt-1.5 list-inside space-y-1">
                  <li className="flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        state.password.hasLowercase
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    1 lowercase character
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        state.password.hasUppercase
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    1 uppercase character
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        state.password.hasNumber
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    1 number
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        state.password.hasMinLength
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    10 characters or more
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <TextField
            type="text"
            name="username"
            label="Username"
            value={state.username.value}
            placeholder="johndoe"
            msgText={error}
            validate={validateCurrentStep}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                username: { value: e.target.value },
              }))
            }
          />
        )}

        {step === 3 && (
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {state.email.value}
            </p>
            <p>
              <strong>Username:</strong> {state.username.value}
            </p>
            <p>
              <strong>Password:</strong> ••••••••
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white w-full py-2 px-4 rounded mt-4"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-2 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i <= step ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 0}
          className={`px-4 py-2 rounded ${
            step === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Back
        </button>
        {step < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
