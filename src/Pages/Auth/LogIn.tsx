import { useForm, SubmitHandler } from "react-hook-form";
import IFormInput from "../../interfaces/IFormInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { findUserById } from "./AuthSlicer";
import useNavigation from "../../Hooks/useNavigation";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

function LogIn({}: Props) {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const dispatch = useDispatch<AppDispatch>();
  const { goTo } = useNavigation();
  const { userId, status, error } = useSelector((state: RootState) => state.authentication);

  const onSubmit: SubmitHandler<IFormInput> = async (userdata) => {
    console.log(userdata)
    let userId= userdata.emailId;
    dispatch(findUserById(userId));
  };

  useEffect(() => {
    if (status === "succeeded" && userId) {
      goTo(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [status, userId, longLink, goTo]);

  return (
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
      <span className="flex justify-center mt-4 items-center">
        <button
          type="submit"
          className="w-1/2 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-200 shadow-sm border hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </button>
      </span>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default LogIn;
