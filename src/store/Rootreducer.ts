import { combineReducers } from "@reduxjs/toolkit";
import AuthSlicer from "../Pages/Auth/AuthSlicer";
import Dashboardslice from "../feature/dashboard/Dashboardslice";


const Rootreducer = combineReducers({
     authentication:AuthSlicer,
     dashbord:Dashboardslice,
})

export default Rootreducer;