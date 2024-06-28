import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSearchParams } from "react-router-dom";
import TabPanelProps from "../interfaces/TabPanelProps";
import LogIn from "./Auth/LogIn";
import Register from "./Auth/Register";








const AuthenticationPage: React.FC = () => {
  let [searchParams] = useSearchParams();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : "Login / Signup"}
      </h1>
      <Box className="lg:w-1/2 sm:w-full md:w-1/2 mt-3 text-white  rounded p-2">
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            ".MuiTab-root": {
              color: "white",
              flexGrow: 1,
            },
            ".Mui-selected": {
              color: "blue",
              background: "bg-blue-400",
            },
            ".MuiTab-root.Mui-disabled": {
              opacity: 0.5,
              color: "lightgrey",
            },
          }}
        >
          <Tab label="login"  {...a11yProps(0)}/>
          <Tab label="register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LogIn/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Register/>
      </CustomTabPanel>
    </div>
  );
};

export default AuthenticationPage;


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="lg:w-1/2 md:w-1/2 sm:w-full"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}