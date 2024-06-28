import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";

const DashBoard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="success" />
      </Box>
      <div className="grid grid-cols-2 gap-4">
        <section className="border rounded p-3">
          <h3 className="font-extralight text-blue-400 antialiased">
            Created Links
          </h3>
        </section>
        <section className="border rounded p-3">
          <h3 className="font-extralight text-blue-400">
            Total People Vistied
          </h3>
        </section>
      </div>
      <div className="flex justify-between">
        <p className="p-1 font-semibold">My Links</p>
        <Button variant="outlined">Create A Link</Button>
      </div>
      <div className="relative border">
        <TextField
          id="outlined-basic"
          label="Search for url"
          variant="outlined"
          className="border w-full"
          sx={{
            "& .MuiInputBase-root": {
              color: "#3b82f6",
            },
            "& .MuiInputLabel-root": {
              color: "#3b82f6",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3b82f6",
              },
            },
          }}
        />
        <FilterAltIcon
          fontSize="large"
          className="absolute top-2 right-2 p-1"
        />
      </div>
    </div>
  );
};

export default DashBoard;
