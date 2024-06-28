import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createUser } from "./AuthSlicer";
import useNavigation from "../../Hooks/useNavigation";
import { useSearchParams } from "react-router-dom";

type FormValues = {
  emailId: string;
  password: string;
};

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { goTo } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { userId, status, error } = useSelector((state: RootState) => state.authentication);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(createUser({ userId: data.emailId, password: data.password }));
  };

  useEffect(() => {
    if (status === "succeeded" && userId) {
      goTo(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [status, userId, longLink, goTo]);

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,20})/;
    return regex.test(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-2">
        <label className="w-full mt-2 mb-2 font-semibold">EmailId/Name</label>
        <input
          {...register("emailId", {
            required: "Username is required",
            minLength: {
              value: 7,
              message: "Username should be at least 7 characters long",
            },
            validate: (value) => value.trim().length > 0 || "Username should not contain only spaces",
          })}
          className="w-full p-2 mb-2 outline-none rounded text-black"
          placeholder="Email"
        />
        {errors.emailId && (
          <span className="text-red-500">{errors.emailId.message}</span>
        )}
        <label className="w-full mt-2 mb-2 font-semibold">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 7,
              message: "Password should be at least 7 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password should not exceed 20 characters",
            },
            validate: {
              complexity: (value) =>
                validatePassword(value) || "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)",
            },
          })}
          type="password"
          className="w-full p-2 mb-2 outline-none rounded text-black"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <span className="flex justify-center mt-4 items-center">
          <button
            type="submit"
            className="w-1/2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-200 shadow-sm border hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </span>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
