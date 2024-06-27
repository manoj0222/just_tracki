import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useFetch from "../../Hooks/useFetch";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createUser } from "./AuthSlicer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSearchParams } from "react-router-dom";
import useNavigation from "../../Hooks/useNavigation";

type FormValues = {
  emailId: string;
  password: string;
};

const Register: React.FC = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const {register, handleSubmit,formState: { errors }, watch,} = useForm<FormValues>();
  const { goTo } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [userState, setUserState] = useState({ userId: "", password: ""});

  const postUser = useCallback (async(userState:any)=>{
    const response = await dispatch(createUser(userState)).unwrap();
    return response;
  },[])

  const { isLoading, error,data:userdata, fn:saveUser } = useFetch({callback:postUser});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data) {
      setUserState({
        userId: data.emailId,
        password: data.password,
      });
    }
    saveUser(userState);
    console.log(userdata)
    if (error === null && userdata) {
      goTo(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  };

  // Function to check password complexity
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
            validate: (value) =>
              value.trim().length > 0 ||
              "Username should not contain only spaces",
          })}
          className="w-full p-2 mb-2 outline-none rounded text-black"
          placeholder="Email"
        />
        {errors.emailId && (
          <span className="text-red-500">{errors.emailId.message}</span>
        )}
        <label className="w-full mt-2 mb-2  font-semibold">Password</label>
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
                validatePassword(value) ||
                "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)",
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
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <button
              type="submit"
              className="w-1/2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-200 shadow-sm border hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          )}
        </span>
      </form>
    </div>
  );
};

export default Register;
