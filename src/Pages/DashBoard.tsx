import React, { useEffect, useState,useCallback } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getAllCreatedLinksByUserId } from "../feature/dashboard/Dashboardslice";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../enum/Status";
import { countVistors } from "../feature/dashboard/Dashboardslice";
import { searchedText } from "../feature/dashboard/Dashboardslice";
import LinkCard from "../components/LinkCard";
import CreateLinkModal from "../feature/dashboard/CreateLinkModal";

const DashBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [modelState, setModelState] = useState(false);
  const [text,setSearchedText]=useState("");

  // Selecting state from Redux store
  const {isLoading, filteredLinks, countvisiters,noofcreatedLinks } = useSelector(
    (state: RootState) => state.dashbord
  );

  useEffect(() => {
    dispatch(getAllCreatedLinksByUserId());
    dispatch(countVistors());
  }, [dispatch]); // Adding dispatch to dependencies to avoid missing dependency warning


  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSearchedText(text);
    dispatch(searchedText(text));
  }, [dispatch]);
 

  return (
    <div className="flex flex-col gap-8">
      {isLoading === STATUS.LOADING ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="success" />
        </Box>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <section className="border rounded p-3 font-extralight text-blue-400 antialiased hover:cursor-pointer focus:cursor-pointer">
              <h3 className="text-lg">Created Links</h3>
              <h2 className="text-5xl">{noofcreatedLinks || 0}</h2>
            </section>
            <section className="border rounded p-3 text-blue-400 font-extralight antialiased hover:cursor-pointer focus:cursor-pointer">
              <h3 className="text-lg">
                Total People Visited of All created Links
              </h3>
              <h2 className="text-5xl">{`${countvisiters}`}</h2>
            </section>
          </div>
          <div className="flex justify-between">
            <p className="p-1 font-semibold">My Links</p>
            <CreateLinkModal
              modelState={modelState}
              setModelState={setModelState}
            />
          </div>
          <div className="relative border">
            <TextField
              id="outlined-basic"
              label="Search for url"
              variant="outlined"
              onChange={(e)=>{handleSearchChange(e)}}
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
          <section className="border-2">
            {/* Ensure createdLinks is defined and handle empty case */}
            {filteredLinks &&
              filteredLinks.length > 0 &&
              filteredLinks.map((item) => (
                <LinkCard key={item._id} url={item}/>
              ))}
          </section>
        </>
      )}
    </div>
  );
};

export default DashBoard;
