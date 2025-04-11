import React from "react";
import CollectionData from "./collectionData";
import DailySales from "./dailySales";

const Home = () => {
  return (
    <div className="xs:mt-30">
      <div className="flex justify-center mt-0">
        <img src="/logo.jpeg" alt="Logo" className="justify-center-center w-[270px] h-30"/>
      </div>
      
      <div className="">
        <DailySales/>
        <CollectionData />
      </div>
    </div>
  );
};

export default Home;
