import { combineReducers } from "@reduxjs/toolkit";
import AuthSlicer from "../Pages/Auth/AuthSlicer";


const Rootreducer = combineReducers({
     authentication:AuthSlicer,
})

export default Rootreducer;