import React, { useState } from "react";
import Banner from "../assets/Banner.png";
import AccordionTransition from "../components/AccordionTransition";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [url, SetUrl] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (url.length > 0) {
      navigate(`/auth?createNew=${url}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2
        className="my-10 
      sm:my-16 text-3xl 
      sm:text-6xl
       lg:text-7xl text-white text-center font-extrabold"
      >
        The only URL Tracker <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form
        className="w-full 
       flex flex-row  flex-wrap justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          placeholder="Enter your Url"
          className="
        border outline-none p-2 
        rounded-lg 
        text-black
        font-semibold
        lg:w-1/2
        sm:w-full
        sm:text-xl
        lg:text-sm"
          value={url}
          onChange={(e) => {
            SetUrl(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="
        rounded-md bg-black px-4 py-1 
        ml-1 text-sm font-semibold 
        text-white shadow-sm 
        sm:w-full
        lg:w-1/6
        md:w-1/6
        sm:text-2xl
        md:text-lg
        lg:text-sm
        hover:bg-gray-700 focus:bg-gray-700 text-teal-200"
        >
          Proceed !
        </button>
      </form>
      <span className="w-full bg-black flex items-center justify-center mt-5">
        <img
          src={`${Banner}`}
          alt="Banner.png"
          className="w-1/5 p-1 rounded object-fit bg-black -rotate-60"
        />
      </span>
      <span className="w-full p-3 mt-2">
        <AccordionTransition />
      </span>
    </div>
  );
};

export default HomePage;
