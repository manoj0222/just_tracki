import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallVisiterData } from "../feature/StatsofUser/VistorsSlice";
import { RootState } from "../store/store";
import { Box, CardHeader, CardContent, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import STATUS from "../enum/Status";
import Location from "../components/Location";
import DeviceStats from "../components/DeviceStats";
import Card from "@mui/material/Card";
import useRedirection from "../Hooks/useRedirection";
import TimeStats from "../components/TimeStats";

type Props = {};

export default function StatsofLinkView({}: Props) {
  const { id, title, qrcode } = useParams();
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.vistors);
  const qr_code = decodeURIComponent(qrcode || "");
  const redirection = useRedirection();

  useEffect(() => {
    if (id) {
      dispatch(getallVisiterData(id));
    }
  }, []);

  if (isLoading === STATUS.LOADING) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="success" />
      </Box>
    );
  }

  return (
    <>
      <h1 className="text-6xl">Stats of Vistied Users</h1> <br></br>
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <button
            className="text-3xl font-extrabold hover:underline cursor-pointer"
            onClick={() => {
              redirection(id, "");
            }}
          >
            {title}
          </button>
          <img
            src={qr_code}
            className="w-1/2 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <>
          <Card
            className="sm:w-3/5"
            variant="outlined"
            sx={{ backgroundColor: "rgb(10 10 10)", color: "white" }}
          >
            <CardHeader>
              <Typography
                className="text-4xl font-extrabold"
                sx={{ color: "white" }}
              >
                Stats
              </Typography>
            </CardHeader>
            {data && data.length ? (
              <CardContent className="flex flex-col gap-6">
                <Card
                  variant="outlined"
                  sx={{ backgroundColor: "black", color: "white" }}
                >
                  <CardHeader>Total Clicks</CardHeader>
                  <CardContent></CardContent>
                </Card>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Location Info
                </Typography>
                <span className="border-2 p-2">
                  <Location data={data} />
                </span>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Device Info
                </Typography>
                <span className="border-2 p-2">
                  <DeviceStats data={data} />
                </span>
                <span className="border-2 p-2">
                <TimeStats data={data} />
                </span>
              </CardContent>
            ) : (
              <CardContent>
                <Typography sx={{ color: "white" }}>
                  No Stats was present till now
                </Typography>
              </CardContent>
            )}
          </Card>
        </>
      </div>
    </>
  );
}
