import { useForm, SubmitHandler } from "react-hook-form";
import IFormInput from "../../interfaces/IFormInput";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { findUserById } from "./AuthSlicer";
import LoadingButton from "@mui/lab/LoadingButton";
import useNavigation from "../../Hooks/useNavigation";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { useState,useCallback } from "react";

type Props = {};

function LogIn({}: Props) {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const {register,handleSubmit,formState: { errors },watch,} = useForm<IFormInput>();
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<string>("");


  //memoized Dispatcher
  const fetchUserById = useCallback(async (id: string) => {
    const response = await dispatch(findUserById(id)).unwrap();
    return response;
  }, [dispatch]);

  const { isLoading, data, error, fn: fetchUser } = useFetch({callback: fetchUserById});
  const { goTo } = useNavigation();

  const onSubmit: SubmitHandler<IFormInput> = async (userdata) => {
    if (userdata) {
      let userId = userdata.emailId;
      setUserId(userId);
      fetchUser();
      console.log(data)
      if (error == null && data) {
        goTo(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      }
    }
  };

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
            Sign In
          </button>
        )}
      </span>
    </form>
  );
}

export default LogIn;
