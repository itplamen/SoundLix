"use client";

import React, { useState } from "react";
import TextField from "../Common/TextField";
import Checkbox from "../Common/Checkbox";
import { useAppDispatch } from "@/app/state/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Form from "./Form";

type State = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [details, setDetails] = useState<State>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async () => {
    await signInWithEmailAndPassword(auth, details.email, details.password);
  };

  return (
    <>
      <Form
        heading="Sign in to our platform"
        btnText="Login to your account"
        footer={
          <>
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </>
        }
        action={handleSubmit}
      >
        <TextField
          type="email"
          name="email"
          text="Your email"
          value={details.email}
          required={true}
          placeholder="name@company.com"
          onChange={(e) =>
            setDetails((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <TextField
          type="password"
          name="password"
          text="Your password"
          value={details.password}
          required={true}
          placeholder="••••••••"
          onChange={(e) =>
            setDetails((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <div className="flex justify-between">
          <div className="flex items-center">
            <Checkbox text="Remember me" checked={details.rememberMe} />
          </div>
          <a
            href="#"
            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Lost Password?
          </a>
        </div>
      </Form>
    </>
  );
};

export default SignIn;
