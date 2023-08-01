import useMediaQuery from "hooks/useMediaQurey";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isTopOfPage }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1060px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const color = isTopOfPage ? "bg-white text-black" : "bg-gray-500";
  const menuItems = ["Home", "About", "Login"];
  const navigate = useNavigate();

  const handleMenuItemClick = (item) => {
    if (item === "Login") return navigate("/auth");
    setIsMenuOpen(false);
  };
  const handleCLick = () => {
    navigate("/auth");
  };
  return (
    <div
      className={`z-40 w-full fixed top-0 py-6 ${color}  transition duration-300`}
    >
      <div className="flex justify-between items-center w-5/6 md:w-4/6 mx-auto p-4 gap-6">
        <p className="text-3xl">Track Well</p>
        {isNonMobileScreen ? (
          <div className="flex gap-8 text-md">
            <button className="hover:text-gray-400 transition duration-150">
              Home
            </button>
            <button className="hover:text-gray-400 transition duration-150">
              About
            </button>
            <button
              onClick={handleCLick}
              className="text-white py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-800 transition duration-150"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              className="text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
            {isMenuOpen && (
              <ul className="absolute top-7 right-0 bg-white border rounded-lg shadow-md">
                {menuItems.map((item) => (
                  <li
                    key={item}
                    className="p-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
