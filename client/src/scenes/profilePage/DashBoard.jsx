import { useSelector } from "react-redux/es/hooks/useSelector";
import { Line, Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Dashboard = () => {
  const incomes = useSelector((state) => state.incomes);
  const expenses = useSelector((state) => state.expenses);

  const incomeAmounts = incomes.map((income) => income.amount);
  const expenseAmounts = expenses.map((expense) => expense.amount);

  const totalIncome = incomeAmounts.reduce((acc, amount) => acc + amount, 0);
  const totalExpenses = expenseAmounts.reduce((acc, amount) => acc + amount, 0);

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return dateObj.toISOString().split("T")[0];
  };
  console.log(incomes, expenses);
  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Income",
        data: incomeAmounts,
        borderColor: "green",
        borderWidth: 1,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "green",
      },
      {
        label: "Expenses",
        data: expenseAmounts,
        borderColor: "red",
        borderWidth: 1,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "red",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Category",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
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
    <div className="flex flex-col p-10">
      <div className="flex gap-44">
        <div className="flex flex-col gap-5 border-1 rounded-xl shadow-xl p-5">
          <h2 className="text-2xl">Financial Overview</h2>
          <div className="w-[700px] h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="border-1 rounded-xl shadow-xl p-5 w-[500px]">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
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
      </div>
      <div className="flex gap-44">
        <div className="flex flex-col border-1 rounded-xl shadow-xl p-5 mt-12 gap-5 w-[750px]">
          <p className="text-2xl text-green-500">
            Total Income: + ${totalIncome}
          </p>
          <p className="text-2xl text-red-500">
            Total Expenses: - ${totalExpenses}
          </p>
          <p className="text-2xl">Total: {totalIncome - totalExpenses}</p>
        </div>
        <div className="mt-12 w-[400px] h-[250px]">
          <Pie
            data={pieData}
            options={{maintainAspectRatio: false}}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
