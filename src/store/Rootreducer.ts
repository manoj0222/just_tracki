import { combineReducers } from "@reduxjs/toolkit";
import AuthSlicer from "../Pages/Auth/AuthSlicer";
import Dashboardslice from "../feature/dashboard/Dashboardslice";
import VistorsSlice from "../feature/StatsofUser/VistorsSlice";


const Rootreducer = combineReducers({
     authentication:AuthSlicer,
     dashbord:Dashboardslice,
     vistors:VistorsSlice,
})

export default Rootreducer;