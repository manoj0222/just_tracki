import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout: React.FC = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header/>
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        @Copy Rights Belong to Manoj Kumar.B
      </div>
    </div>
  );
};

export default AppLayout;
