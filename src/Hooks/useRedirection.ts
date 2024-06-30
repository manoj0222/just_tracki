import { useCallback } from "react";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { saveVisitors } from "../feature/StatsofUser/VistorsSlice";
import { useDispatch } from "react-redux";
import { findUrlById } from "../feature/dashboard/Dashboardslice";

const parser = new UAParser();

const useRedirection = () => {
  const dispatch = useDispatch();

  const redirection = useCallback(
    async (id: string | null|undefined, originalurl: string) => {
      const res = parser.getResult();
      const device = res.type || "desktop"; // Default to desktop if type is not detected
      const url_id = id || ""; // Ensure url_id is not null
      try {
        const response = await axios.get("https://ipapi.co/json");
        const { city, country_name: country } = response.data;

        // Dispatch the saveVisitors action
        dispatch(saveVisitors({ city, country, device, url_id }));

        // Fetch the URL if originalurl is null or empty
        let finalUrl = originalurl;
        if (!finalUrl) {
          const urlData = await dispatch(findUrlById(url_id)).unwrap();
          finalUrl = urlData?.data?.originalurl;
          console.log("url_id",urlData);
          console.log("finalUrl",finalUrl);
        }

        // Open the URL in a new tab if finalUrl is valid
        if (finalUrl) {
          window.open(finalUrl, "_blank");
        } else {
          console.error("No valid URL found for redirection");
        }
      } catch (error) {
        console.error(
          "Error has occurred, please check the third-party API",
          error
        );
      }
    },
    [dispatch]
  );

  return redirection;
};

export default useRedirection;
