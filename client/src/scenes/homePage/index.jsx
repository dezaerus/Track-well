import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "scenes/navbar";
import safe from "assets/safe.png";
import users from "assets/users.png";
import reviews from "assets/reviews.png";
import support from "assets/24.webp";

const SectionSeparator = () => {
  return <div className="my-16 bg-gray-200 h-32" />;
};

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

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const variant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <main className="flex flex-col gap-36 bg-gray-100">
      <nav>
        <Navbar isTopOfPage={isTopOfPage} />
      </nav>

      <section
        id="home"
        className="flex flex-col mt-40 justify-center items-center px-4 gap-12"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <p className="text-4xl text-gray-800 text-center font-semibold">
            {" "}
            <span className="text-blue-500 text-6xl block py-2">
              An Easy way
            </span>{" "}
            to manage personal finances
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={variant}>
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
              <img src={safe} alt="safe" className="w-20 h-20 mb-2" />
              <p className="text-lg font-semibold">100% Secured data</p>
            </div>
          </motion.div>

          <motion.div variants={variant}>
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
              <img src={users} alt="users" className="w-20 h-20 mb-2" />
              <p className="text-lg font-semibold">100k + users</p>
            </div>
          </motion.div>

          <motion.div variants={variant}>
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
              <img src={reviews} alt="reviews" className="w-20 h-20 mb-2" />
              <p className="text-lg font-semibold">10k+ five star Reviews</p>
            </div>
          </motion.div>

          <motion.div variants={variant}>
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg">
              <img src={support} alt="support" className="w-20 h-20 mb-2" />
              <p className="text-lg font-semibold">24/7 Support</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SectionSeparator />

      <section
        id="about"
        className="flex flex-col m-10 mx-5 gap-16"
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl my-3 font-semibold">
                Simple money tracker
              </h3>
              <p className="text-gray-600">
                It takes seconds to record daily transactions. Put them into
                clear and visualized categories such as Expense: Food, Shopping,
                or Income: Salary, Gift.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl my-3 font-semibold">
                The whole picture in one place
              </h3>
              <p className="text-gray-600">
                One report to give a clear view of your spending patterns.
                Understand where your money comes and goes with easy-to-read
                graphs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-10">
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl my-3 font-semibold">Data Download</h3>
              <p className="text-gray-600">
                If you need your data, you can:
                <br />- <span>Download it</span>
                <br />- <span>Send it via email</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl my-3 font-semibold">Expense Analysis</h3>
              <p className="text-gray-600">
                Analyze your expenses in detail. Identify areas where you can
                save money and make smarter financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Track Well</p>
        <p className="text-sm">NewTown, Earthy, Marso</p>
      </footer>
    </main>
  );
};

export default HomePage;
