"use client"
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Table from "./components/Table";
import { IUser } from "./utils/userApi";

const Page = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleButtonClick = () => {
    // When the button is clicked, focus the Table component
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <Hero setUser={setUser} handleButtonClick={handleButtonClick} user={user}/>
      <Table setUser={setUser} user={user} ref={tableRef} />
    </div>
  );
};

export default Page;
