import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUser, BiLogOut } from "react-icons/bi";
import {
  AiOutlineBarChart,
  AiFillWallet,
  AiFillMinusSquare,
  AiFillPlusSquare,
} from "react-icons/ai";
import { MdLocalAtm } from "react-icons/md";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogOut = () => {
      dispatch(setLogout())
      navigate("/")
  }

  return (
    <main className="flex justify-start h-screen w-screen gap-10">
      <div className="flex flex-col items-center gap-4 bg-gray-800 py-8 px-6 text-white">
        <div className="flex gap-2 items-center">
          <i className="text-3xl text-gray-600 border-4 border-gray-400">
            <BiUser />
          </i>
          <div>
            <p className="text-lg">{user}</p>
            <p className="text-sm text-gray-400">Your money</p>
          </div>
        </div>
        <div className="w-full bg-slate-200 border"></div>
        <div className="flex flex-col items-start gap-3">
          <button className="hover:text-gray-500 flex items-center">
            {" "}
            <i className="text-lg">
              <AiOutlineBarChart />
            </i>{" "}
            Dashboard
          </button>
          <button className="hover:text-gray-500 flex items-center">
            {" "}
            <i className="text-lg">
              <AiFillWallet />
            </i>
            {""}
            View Transctions
          </button>
          <button className="hover:text-gray-500 flex items-center">
            {" "}
            <i className="text-lg">
              <MdLocalAtm />
            </i>{" "}
            Budget
          </button>
          <button className="hover:text-gray-500 flex items-center">
            {" "}
            <i className="text-lg">
              <AiFillMinusSquare />
            </i>{" "}
            Expenses
          </button>
          <button className="hover:text-gray-500 flex items-center">
            {" "}
            <i className="text-lg">
              <AiFillPlusSquare />
            </i>{" "}
            Income
          </button>
        </div>

        <button onClick={handleLogOut} className="absolute bottom-5 left-2 hover:text-gray-500 flex items-center">
          {" "}
          <i className="text-lg">
            <BiLogOut />
          </i>{" "}
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
