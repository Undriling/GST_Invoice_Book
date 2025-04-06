import React from "react";
import CollectionData from "./collectionData";

const Home = () => {
  return (
    <div className="xs:mt-30">
      <div className="flex justify-center mt-0">
        <img src="../../src/assets/logo.jpeg" alt="Logo" className="justify-center-center w-[270px] h-30"/>
      </div>
      
      <div className="">
        <CollectionData />
      </div>
    </div>
  );
};

export default Home;
