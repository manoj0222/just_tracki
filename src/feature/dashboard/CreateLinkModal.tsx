import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import QRCodeLibrary from "qrcode";
import { createLink, getAllCreatedLinksByUserId } from "./Dashboardslice";

interface FormData {
  title: string;
  originalurl: string;
  custom_url: string;
  qrcode: string;
}

type Props = {
  modelState: boolean;
  setModelState: (param: boolean) => void;
};

const CreateLinkModal: React.FC<Props> = ({ modelState, setModelState }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [inputValues, setInputValues] = useState<FormData>({
    title: "",
    originalurl: "",
    custom_url: "",
    qrcode: "",
  });
  const [showQRCode, setShowQRCode] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors }} = useForm<FormData>();

useEffect(() => {
    if (longLink) {
      setInputValues((prev) => ({
        ...prev,
        originalurl: longLink,
      }));
      setShowQRCode(false);
    }
  }, [longLink]);

  const handleClickOpen = () => {
    setModelState(true);
  };

 const handleQrcode = async (value: string) => {
    if (value !== "" && value.length > 3) {
      try {
        const qrcodeBase64 = await QRCodeLibrary.toDataURL(value, {
          errorCorrectionLevel: "H",
          type: "image/png",
        });
        setInputValues((prev) => ({
          ...prev,
          qrcode: qrcodeBase64,
        }));
        setShowQRCode(true);
      } catch (error) {
        console.error("Error generating QR code:", error);
        setShowQRCode(false);
      }
    } else {
      setShowQRCode(false);
    }
  };

  const handleOriginalUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValues((prev) => ({
      ...prev,
      originalurl: value,
    }));
  };

  const handleCustomUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValues((prev) => ({
      ...prev,
      custom_url: value,
    }));
    handleQrcode(value);
  };

  const handleClose = () => {
    setModelState(false);
    reset();
    setInputValues({
      title: "",
      originalurl: "",
      custom_url: "",
      qrcode: "",
    });
    setShowQRCode(false);
    setErrorMessage(null); // Clear error message on close
  };

  const onSubmit = async (data: FormData) => {
    if (!data.qrcode) {
      const qrcodeBase64 = await QRCodeLibrary.toDataURL(
        inputValues.custom_url,
        { errorCorrectionLevel: "H", type: "image/png" }
      );
      data.qrcode = qrcodeBase64;
    }
    const resultAction = await dispatch(createLink(data));
    const result = resultAction.payload;
    if (typeof result === 'string' && result.startsWith('Error creating URL: AxiosError:')) {
      setErrorMessage("Custom URL already exists. Please choose another."); 
    }
    await dispatch(getAllCreatedLinksByUserId());
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a new Link
      </Button>
      <Dialog
        className="relative z-10 "
        open={modelState}
        onClose={() => setModelState(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 
          transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 
          data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex 
           min-h-full items-end justify-center
           p-4 text-center sm:items-center sm:p-0"
          >
            <DialogPanel
              transition
              className="relative transform overflow-hidden
               rounded-lg bg-white text-left shadow-xl transition-all 
              data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
              data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in
               sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <h2
                className="text-black font-semibold rounded-md px-4 mt-2
               text-2xl"
              >
                Create New Url
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4"
              >
                {errorMessage && (
                  <div className="text-red-500 mb-3">{errorMessage}</div>
                )}
                <div className="text-black mb-3">
                  <label className="font-semibold">Original URL *</label>
                  <br />
                  <input
                    type="text"
                    {...register("originalurl", {
                      required: "Original URL is required",
                    })}
                    className={`w-full border px-2 p-1 mt-2 rounded-md focus:outline-blue-300 ${
                      errors.originalurl ? "border-red-500" : ""
                    }`}
                    onChange={handleOriginalUrlChange}
                    value={inputValues.originalurl}
                  />
                  {errors.originalurl && (
                    <span className="text-red-500 text-sm">
                      {errors.originalurl.type === "required" &&
                        "Original URL is required"}
                    </span>
                  )}
                </div>
                <div className="text-black mb-3">
                  <label className="font-semibold">Custom URL *</label>
                  <br />
                  <input
                    type="text"
                    {...register("custom_url", {
                      required: "Custom URL is required",
                    })}
                    className={`w-full border px-2 p-1 mt-2 rounded-md focus:outline-blue-300 ${
                      errors.custom_url ? "border-red-500" : ""
                    }`}
                    onChange={handleCustomUrlChange}
                    value={inputValues.custom_url}
                  />
                  {errors.custom_url && (
                    <span className="text-red-500 text-sm">
                      {errors.custom_url.type === "required" &&
                        "Custom URL is required"}
                    </span>
                  )}
                </div>
                {showQRCode && (
                  <div className="text-black mb-3">
                    <label className="font-semibold">QR Code *</label>
                    <br />
                    <div className="flex items-center mt-2">
                      <QRCode
                        value={inputValues.custom_url}
                        quietZone={10}
                        logoWidth={100}
                        logoHeight={100}
                        logoImage="MK"
                      />
                    </div>
                  </div>
                )}
                <div className="text-black mb-3">
                  <label className="font-semibold">Title *</label>
                  <br />
                  <input
                    type="text"
                    {...register("title", {
                      required: "Title is required",
                    })}
                    className={`w-full border px-2 p-1  mt-2 rounded-md focus:outline-blue-300 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">
                      {errors.title.type === "required" && "Title is required"}
                    </span>
                  )}
                </div>
                <div
                  className="px-4 py-3 
                flex
                justify-between
                "
                >
                  <button
                    type="button"
                    className="inline-flex justify-center w-full sm:w-auto px-3 py-2 font-semibold rounded-md bg-red-600 text-white shadow-sm hover:bg-red-500 sm:ml-3"
                    onClick={handleClose}
                    autoFocus
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-3 py-2 font-semibold rounded-md ${
                      isLoading
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-500 hover:bg-green-300"
                    } ml-3`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateLinkModal;
