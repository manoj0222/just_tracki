import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getUrlsByUserIdAndCustomUrl } from "../feature/dashboard/Dashboardslice";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import STATUS from "../enum/Status";

const RedirectLinkPage: React.FC = () => {
  const { custom_url } = useParams();
  const { isLoading, originalurl } = useSelector((state: RootState) => state.dashbord);
  const dispatch = useDispatch();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    dispatch(getUrlsByUserIdAndCustomUrl(custom_url));
  }, []);

  const redirectToOriginalUrl = () => {
    setRedirecting(true);
    window.open(originalurl, "_blank");
  };

  if (isLoading === STATUS.LOADING) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  if (!originalurl) {
    return <div className="text-3xl font-semibold">Original URL not found.</div>;
  }

  if (redirecting) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <button onClick={redirectToOriginalUrl} className="font-semibold p-2 text-blue-300">Click to redirect to Original URL...</button>
    </div>
  );
};

export default RedirectLinkPage;
