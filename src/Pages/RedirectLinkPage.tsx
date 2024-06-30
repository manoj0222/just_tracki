import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getUrlsByUserIdAndCustomUrl } from "../feature/dashboard/Dashboardslice";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import STATUS from "../enum/Status";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { saveVisitors } from "../feature/StatsofUser/VistorsSlice";

const parser = new UAParser();

const RedirectLinkPage: React.FC = () => {
  const { custom_url, _id } = useParams();
  const { isLoading, originalurl } = useSelector(
    (state: RootState) => state.dashbord
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUrlsByUserIdAndCustomUrl(custom_url));
  }, []);

  const redirectToOriginalUrl = async () => {
    let url_id = _id;
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    try {
      const response = await axios.get("https://ipapi.co/json");
      const { city, country_name: country } = await response.data;
      dispatch(saveVisitors({ city, country, device, url_id }));
      window.open(originalurl, "_blank");
    } catch (error) {
      console.log("Error has occurred, please check the third-party API");
    }
  };

  if (isLoading === STATUS.LOADING) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  if (!originalurl) {
    return (
      <div className="text-3xl font-semibold">Original URL not found.</div>
    );
  }

  // Render a button for manual redirection in case automatic redirection fails
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={redirectToOriginalUrl}
        className="font-semibold p-2 text-blue-300 border rounded-xl p-2 hover:bg-teal-50"
      >
        Click to redirect to Original URL...
      </button>
    </div>
  );
};

export default RedirectLinkPage;
