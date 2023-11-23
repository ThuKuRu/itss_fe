import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Main from "../../layout/Main/Main";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
const TopPage = () => {
  const [tab, setTab] = useState("upcoming");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  useEffect(()=>{
    if (user.jwt === "") {
      navigate("/login");
    }else{
      console.log("co gi do sai!");
    }
  })

  return (
    <div className="flex gap-4">
      {/* <div className="w-1/5">sidebar</div> */}
      <Sidebar className="w-1/5" tab={tab} setTab={setTab} />
      <Main className="w-4/5 text-blue-400" tab={tab} />
    </div>
  );
};

export default TopPage;
