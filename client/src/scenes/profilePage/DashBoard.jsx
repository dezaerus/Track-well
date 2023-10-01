import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { Line, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";
import useMediaQuery from "hooks/useMediaQurey";
import { Chart } from "chart.js/auto";
import * as XLSX from "xlsx/xlsx.mjs";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const incomes = useSelector((state) => state.incomes);
  const expenses = useSelector((state) => state.expenses);

  const incomeAmounts = incomes.map((income) => Number(income.amount));
  const expenseAmounts = expenses.map((expense) => Number(expense.amount));
  
  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return dateObj.toISOString().split("T")[0];
  };

  const incomeData = incomes.map((item) => ({
    x: formatDate(item.date),
    y: item.amount,
    category: item.category,
  }));

  const expenseData = expenses.map((item) => ({
    x: formatDate(item.date),
    y: item.amount,
    category: item.category,
  }));

  const totalIncome = incomeAmounts.reduce((acc, amount) => acc + amount, 0);
  const totalExpenses = expenseAmounts.reduce((acc, amount) => acc + amount, 0);

  const createExcelBlob = () => {
    const formatDataForExcel = (incomes, expenses) => {
      const allTransactions = [
        ...incomes.map((income) => ({ ...income, label: "Income" })),
        ...expenses.map((expense) => ({ ...expense, label: "Expense" })),
      ];
      allTransactions.sort((a, b) => a.date - b.date);
      const formattedData = allTransactions.map((transaction) => ({
        Description: transaction.description,
        Amount: `${transaction.label === "Expense" ? "-" : ""}${
          transaction.amount
        }`,
        Category: transaction.category,
        Date: formatDate(transaction.date),
      }));

      return formattedData;
    };

    const formattedData = formatDataForExcel(incomes, expenses);

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Financial Data");

    const excelBase64 = XLSX.write(wb, {
      bookType: "xlsx",
      type: "base64",
    });

    return excelBase64;
  };

  const sendToEmail = (recipientEmail) => {
    const excelBase64 = createExcelBlob();

    const templateParams = {
      to_email: recipientEmail,
      attachment: excelBase64,
    };

    const emailService = "your_email_service_id";
    const emailTemplate = "your_email_template_id";
    const emailUser = "your_email_user_id";

    emailjs
      .send(emailService, emailTemplate, templateParams, emailUser)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Email sending error:", error);
      });
  };

  const downloadExcel = () => {
    const excelBase64 = createExcelBlob();

    const byteCharacters = atob(excelBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "financial_data.xlsx");
  };

  const chartData = {
    labels: [...new Set([...incomeData, ...expenseData].map((item) => item.x))],
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        category: "Income",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        category: "Expenses",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  const pieData = {
    labels: ["Total Income", "Total Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <div
      className={
        isMobile
          ? "p-10 flex flex-col gap-6 items-center justify-center"
          : "grid grid-cols-1 md:grid-cols-2 gap-2 p-5 md:p-10"
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center mt-2 gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => sendToEmail("recipient@example.com")}
          >
            Send via Email
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadExcel}
          >
            Download Excel
          </button>
        </div>
        <div className="mt-4 w-full h-[250px] justify-center flex">
          <Pie data={pieData} />
        </div>
      </div>

      <div className="border-1 rounded-xl shadow-xl p-3 md:p-5">
        <h2 className="text-xl md:text-2xl">Financial Overview</h2>
        <div className="flex items-center justify-center  w-[300px] h-[200px] sm:w-full md:h-[400px] md:w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="border-1 rounded-xl shadow-xl p-3 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-2">
          <h1>Income</h1>
          <ul>
            {incomes.map((income) => (
              <li key={income._id} className="text-green-600">
                <span>+ </span> {income.description} - ${income.amount}{" "}
                <span className="text-gray-500 px-1">
                  ({formatDate(income.date)})
                </span>
              </li>
            ))}
          </ul>
          <h1>Expenses</h1>
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id} className="text-red-600">
                <span>- </span>
                {expense.description} - ${expense.amount}{" "}
                <span className="text-gray-500 px-1">
                  ({formatDate(expense.date)})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-1 rounded-xl shadow-xl p-3 md:p-5">
        <p className="text-xl md:text-2xl text-green-500">
          Total Income: + ${totalIncome}
        </p>
        <p className="text-xl md:text-2xl text-red-500">
          Total Expenses: - ${totalExpenses}
        </p>
        <p className="text-xl md:text-2xl">
          Total: {totalIncome - totalExpenses}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
