import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUser, BiLogOut } from "react-icons/bi";
import {
  AiOutlineBarChart,
  AiFillMinusSquare,
  AiFillPlusSquare,
} from "react-icons/ai";
import { setLogout, setExpenses, setIncomes } from "state";
import { useNavigate } from "react-router-dom";
import DashBoard from "scenes/profilePage/DashBoard";
import Record from "scenes/profilePage/Record";

const ProfilePage = () => {
  const isDataFetched = useRef(false);
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.id);
  const [page, setPage] = useState("DashBoard");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomesAndExpenses = async () => {
      try {
        const fetchIncomeAndExpense = async (url, key) => {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
        
          if (!response.ok) {
            throw new Error(`Failed to fetch ${key}`);
          }

          const data = await response.json();
          dispatch(
            key === "incomes"
              ? setIncomes({ incomes: data })
              : setExpenses({ expenses: data })
          );
        };
        
        await Promise.all([
          fetchIncomeAndExpense(
            `http://localhost:3001/income/${userId}`,
            "incomes"
          ),
          fetchIncomeAndExpense(
            `http://localhost:3001/expenses/${userId}`,
            "expenses"
          ),
        ]);

        isDataFetched.current = true;
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (!isDataFetched.current) {
      fetchIncomesAndExpenses();
    }
  }, [token, userId, dispatch]);

  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-800 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  return (
    <main className="flex justify-start h-screen w-screen gap-10">
      <aside className="flex flex-col items-start gap-4 bg-gray-800 py-8 px-6 text-white w-[250px]" id="aside">
        <div className="flex gap-2 items-center">
          <i className="text-3xl text-gray-600">
            <BiUser />
          </i>
          <div>
            <p className="text-lg">{user.username}</p>
            <p className="text-sm text-gray-400">Account</p>
          </div>
        </div>
        <hr className="w-full border-gray-600" />
        <div className="flex flex-col items-start gap-3">
          <button
            onClick={() => setPage("DashBoard")}
            className={`hover:text-gray-500 flex items-center ${page === 'DashBoard' ? 'text-gray-500' : ''}`}
          >
            <i className="text-lg">
              <AiOutlineBarChart />
            </i>
            Dashboard
          </button>
          <button
            onClick={() => setPage("Expenses")}
            className={`hover:text-gray-500 flex items-center ${page === 'Expenses' ? 'text-gray-500' : ''}`}
          >
            <i className="text-lg">
              <AiFillMinusSquare />
            </i>
            Expenses
          </button>
          <button
            onClick={() => setPage("Income")}
            className={`hover:text-gray-500 flex items-center ${page === 'Income' ? 'text-gray-500' : ''}`}
          >
            <i className="text-lg">
              <AiFillPlusSquare />
            </i>
            Income
          </button>
        </div>

        <button
          onClick={handleLogOut}
          className="absolute bottom-5 left-2 hover:text-gray-500 flex items-center"
        >
          <i className="text-lg">
            <BiLogOut />
          </i>
          Sign Out
        </button>
      </aside>
      <div className="w-full" id="board">
        {page === "DashBoard" ? (
          <DashBoard />
        ) : page === "Expenses" ? (
          <Record page={page} />
        ) : (
          <Record page={"Income"} />
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
