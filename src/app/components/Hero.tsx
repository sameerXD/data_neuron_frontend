"use client";
import React, { useState } from "react";
import { IUser, loginUser } from "../utils/userApi";

const Hero = (props: {
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  handleButtonClick: () => void;
  user: IUser | undefined;
}) => {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const handleSignUp = async () => {
    try {
      const postData = await loginUser(email);
      console.log(postData);
      props.setUser(postData);
      props.handleButtonClick();
    } catch (err: any) {
      console.log(err.response.data.errors);
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto flex flex-col text-center justify-center">
        <p className="text-[#00df9a] font-bold p-2 ">
          Lets make rock solid Web App.
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Quick and Effective
        </h1>

        <div className="md:py-6">
          <p>Fast , flexible ....</p>
        </div>

        <div className="md:py-6 text-[#00df9a]">
          <p>Please signup to get started...</p>
        </div>

        <div className="flex flex-col p-7 md:flex-row md:justify-center md:items-center">
          <input
            type="text"
            placeholder="email"
            className={
              errors.length > 0 && errors[0].field === "email"
                ? "my-4 p-2 md:mr-2 text-black border-solid border-2 border-red-600"
                : "my-4 p-2 md:mr-2 text-black"
            }
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors([]);
            }}
          />
          <button
            className="bg-[#00df9a] hover:bg-white hover:text-[#00df9a] md:p-2"
            onClick={handleSignUp}
          >
            SignUp!
          </button>
        </div>
        {errors.length > 0 && errors[0].field === "email" && (
          <p className="text-red-600">* {errors[0].message}</p>
        )}

      </div>
    </div>
  );
};

export default Hero;
