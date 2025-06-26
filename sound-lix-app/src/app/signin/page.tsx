"use client";

import { useState } from "react";
import TextField from "@/components/Common/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Checkbox from "@/components/Common/Checkbox";
import { useRouter } from "next/navigation";
import Link from "next/link";

type State = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const SignIn = () => {
  const router = useRouter();
  const [details, setDetails] = useState<State>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, details.email, details.password);

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Sign in to our platform
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            label="Your email"
            value={details.email}
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
            label="Password"
            value={details.password}
            placeholder="••••••••"
            onChange={(e) =>
              setDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox
                text="Remember me"
                checked={details.rememberMe}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
              />
            </div>
            <a
              href="#"
              className="text-sm text-blue-700 hover:underline dark:text-blue-400"
            >
              Lost Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login to your account
          </button>

          <div className="text-sm text-center text-gray-600 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="/signup"
              className="text-blue-700 hover:underline dark:text-blue-400"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
