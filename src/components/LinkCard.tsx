import React from "react";
import URLInfo from "../interfaces/URLInfo";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  deleteById,
  getAllCreatedLinksByUserId,
} from "../feature/dashboard/Dashboardslice";

type Props = {
  url: URLInfo;
 
};

export default function LinkCard({url }: Props) {
  const dispatch = useDispatch();

  const handledelete = async () => {
    await dispatch(deleteById(url._id));
    await dispatch(getAllCreatedLinksByUserId());
  };
  const encodedTitle = encodeURIComponent(url?.title || "");
  const encodedQrCode = encodeURIComponent(url?.qrcode || "");

  const downloadImage = () => {
    // Guard against undefined or null url
    if (!url) {
      console.error("URL is undefined or null");
      return;
    }

    const imageUrl = url.qrcode;
    const fileName = url.title || "image"; // Provide a default file name if title is undefined

    const anchor = document.createElement("a");
    anchor.href = imageUrl || ""; // Handle potential undefined with default value
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  if (!url) {
    return null; // Or render a loading state or placeholder if url is undefined
  }

  return (
    <Link className="flex flex-col md:flex-row gap-4 border p-4 bg-gray-900 rounded-lg mb-2" to={`/link/${url?._id}/${encodedTitle}/${encodedQrCode}`}>
      <img
        src={`${url.qrcode}`} // Ensure url.qrcode is safely accessed
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      <div className="flex-1">
        <Link
          to={`/link/${url?._id}/${encodedTitle}/${encodedQrCode}`}
          className="mb-2 flex  hover:underline cursor-pointer"
        >
          <span className="text-3xl font-extrabold">
            {url.title}
          </span>
        </Link>
        <Link to={`/visit/${url.custom_url}/${url?._id}`} className="mb-2 flex hover:underline cursor-pointer">
          <span className="text-2xl text-blue-400 font-bold ">
            {url.custom_url}
          </span>
        </Link>
        <span className="items-center gap-1">
          <LinkIcon className="p-1" />
          {url.originalurl}
        </span>
        <span className="flex items-end font-extralight text-sm">
          {new Date(url.createdate).toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2  ">
        <Button
          onClick={() => navigator.clipboard.writeText(`${url.custom_url}`)}
        >
          <ContentCopyIcon />
        </Button>
        <Button onClick={downloadImage}>
          <DownloadIcon />
        </Button>
        <Button onClick={handledelete}>
          <DeleteIcon />
        </Button>
      </div>
    </Link>
  );
}
