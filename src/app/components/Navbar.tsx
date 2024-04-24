'use client'
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = ()=>{
    setNav(!nav)
  }
  return (
    <div className="text-white flex justify-between item-center h-24 max-w-[1240px] mx-auto px-4">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        Sameer Vashisth
      </h1>
      <ul className=" hidden md:flex">
        <li className="p-4">Home</li>
        <li className="p-4">Company</li>
        <li className="p-4">Resource</li>
        <li className="p-4">About</li>
        <li className="p-4">Contact</li>
      </ul>
      <div className="flex justify-center items-center md:hidden" onClick={handleNav}>
        {!nav?<AiOutlineMenu size={20} />:<AiOutlineClose size={20} />}
      </div>
      <div className={nav?"fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full bg-[#000300] ease-in-out duration-500 md:left-[-100%]":"fixed left-[-100%]"}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          Sameer Vashisth
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-grey-600">Home</li>
          <li className="p-4 border-b border-grey-600">Company</li>
          <li className="p-4 border-b border-grey-600">Resource</li>
          <li className="p-4 border-b border-grey-600">About</li>
          <li className="p-4">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
