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

export default function LinkCard({ url }: Props) {
  const dispatch = useDispatch();

  const handledelete = async () => {
    await dispatch(deleteById(url._id));
    await dispatch(getAllCreatedLinksByUserId());
  };

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
    <div className="flex flex-col md:flex-row gap-4 border p-4 bg-gray-900 rounded-lg mb-2">
      <img
        src={`${url.qrcode}`} // Ensure url.qrcode is safely accessed
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      <Link to={`/link/${url?._id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url.title}
        </span>
        <Link to={`/visit/${url.custom_url}/${url?._id}`}>
          <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
            {url.custom_url || ""}
          </span>
        </Link>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url.originalurl}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url.createdate).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
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
    </div>
  );
}
