import { useEffect, useState } from "react";
import Navbar from "scenes/navbar";
import safe from "assets/safe.png";
import users from "assets/users.png";
import reviews from "assets/reviews.png";
import support from "assets/24.webp";

const HomePage = () => {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (isTop !== isTopOfPage) {
        setIsTopOfPage(isTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTopOfPage]);

  return (
    <main className="flex flex-col gap-64">
      <nav>
        <Navbar isTopOfPage={isTopOfPage} />
      </nav>
      <section
        id="home"
        className="flex flex-col justify-center items-center md:mt-16 px-2 gap-8"
      >
        <p className="text-4xl text-gray-400 text-center">
          {" "}
          <span className="text-gray-900 text-6xl block py-2">
            An Easy way
          </span>{" "}
          to manage personal finances
        </p>
        <div className="grid grid-cols-2  md:grid-cols-4 mt-10 gap-8">
          <div className="flex flex-col justify-center items-center  bg-gray-300 p-2 text-lg m-2 gap-2">
            <img src={safe} alt="safe" className="w-20 h-20" />{" "}
            <p>100% Secured data</p>{" "}
          </div>
          <div className="flex flex-col justify-center items-center  bg-gray-300 p-2 text-lg m-2 gap-2">
            <img src={users} alt="users" className="w-20 h-20" />
            <p>100k + users</p>{" "}
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-300 p-2 text-lg m-2 gap-2">
            <img src={reviews} alt="reviews" className="w-20 h-20" />{" "}
            <p>10k+ five star Reviews</p>{" "}
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-300 p-2 text-lg m-2 gap-2">
            <img src={support} alt="support" className="w-20 h-20" />{" "}
            <p>24/7 Support</p>{" "}
          </div>
        </div>
      </section>
      <section id="about" className="flex flex-col mt-10 mx-5 gap-44">
        <div className="flex flex-col justify-start md:justify-center items-center md:flex-row gap-10">
          <div className="w-[90vw] md:w-96 h-40 shadow-2xl rounded-lg order-2 md:order-1"></div>
          <div className="order-1 w-full md:w-96">
            <h3 className="text-2xl my-3">Simple money tracker</h3>
            <p className="text-gray-500">
              It takes seconds to record daily transactions. Put them into clear
              and visualized categories such as Expense: Food, Shopping or
              Income: Salary, Gift.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col justify-start md:justify-center items-center md:flex-row gap-10">
          <div className="w-[90vw] md:w-96 h-40 shadow-2xl rounded-lg order-2 md:order-1"></div>
          <div className="order-1 w-full md:w-96">
            <h3 className="text-2xl my-3">The whole picture in one place</h3>
            <p className="text-gray-500">
              One report to give a clear view on your spending patterns.
              Understand where your money comes and goes with easy-to-read
              graphs.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-200 text-black py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Track Well</p>
        <p className="text-sm">NewTown, Earthy, Marso</p>
      </footer>
    </main>
  );
};

export default HomePage;
