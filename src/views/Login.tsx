/** @format */

import { Button } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { logIn } from "../services/auth";

// if the user is NOT logged in, this is the view that they are navigated to:

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleForm = async () => {
    console.log("handling sign in request...");

    if (!email || !password) {
      const errorMsg = "No email or password provided";
      return setError(errorMsg);
    }

    const res = await logIn({ email, password });

    if (res.success) {
      // navigate("/");
    } else {
      return setError("something went wrong! ᴖ̈");
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-primary rounded-lg border-accent border w-96 h-auto bg-white">
      <div className="flex flex-col gap-1 pb-2 border-secondary border-b">
        <div className="font-title text-3xl italic">Welcome to Vessel.</div>
        <div className="text-md">To get started, please login:</div>
      </div>
      <div className="mt-4 flex flex-col  gap-2 w-[320px]">
        <label
          htmlFor="email"
          className="flex items-center font-title justify-between gap-4"
        >
          <p>Email</p>
          <Input
            icon={<IoIosMail className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            placeholder="example@mail.com"
            classname="min-w-[220px] text-secondary"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center font-title justify-between gap-4"
        >
          <p>Password</p>
          <Input
            icon={<FaKey className="2xl text-secondary" />}
            setInput={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="12345"
            classname="min-w-[220px]"
          />
        </label>
        <div className="text-xs mb-4">
          <div className="opacity-75 ">
            Don't have an account yet?{" "}
            <a
              href="http://localhost:3000/auth/signup"
              className="underline text-accent"
            >
              {/* // TO DO: implement web-page redirect */}
              Sign up
            </a>{" "}
            instead.
          </div>
          {error && <div className="text-red-500">Oops! {error}</div>}
        </div>
        <div className="flex justify-end mt-4">
          <Button text="Sign in" onClick={() => handleForm()} />
        </div>
      </div>
    </div>
  );
}
