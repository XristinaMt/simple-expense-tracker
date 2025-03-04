import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import IncomeInput from "./IncomeInput";
import FixedExpensesInput from "./FixedExpensesInput";
import VariableExpensesInput from "./VariableExpensesInput";
import './styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [income, setIncome] = useState("");
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [variableExpenses, setVariableExpenses] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getMonth() + 1}-${now.getFullYear()}`;
  };

  useEffect(() => {
    const storedIncome = localStorage.getItem("income");
    const storedFixedExpenses = JSON.parse(localStorage.getItem("fixedExpenses")) || [];
    const storedVariableExpenses = JSON.parse(localStorage.getItem("variableExpenses")) || [];
    const storedMonthlyData = JSON.parse(localStorage.getItem("monthlyData")) || [];

    setIncome(storedIncome || "");
    setFixedExpenses(storedFixedExpenses);
    setVariableExpenses(storedVariableExpenses);
    setMonthlyData(storedMonthlyData);
    setCurrentMonth(getCurrentMonthYear());
  }, []);

  useEffect(() => {
    localStorage.setItem("income", income);
    localStorage.setItem("fixedExpenses", JSON.stringify(fixedExpenses));
    localStorage.setItem("variableExpenses", JSON.stringify(variableExpenses));
    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
  }, [income, fixedExpenses, variableExpenses, monthlyData]);

  const handleSubmitExpenses = () => {
    setIsSubmitted(true);

    const newMonthData = {
      month: currentMonth,
      income: parseFloat(income),
      fixedExpenses,
      variableExpenses,
    };

    let updatedData = [...monthlyData];
    const existingIndex = updatedData.findIndex((data) => data.month === currentMonth);

    if (existingIndex !== -1) {
      updatedData[existingIndex] = newMonthData;
    } else {
      updatedData = [...updatedData, newMonthData];
    }

    setMonthlyData(updatedData);
    localStorage.setItem("monthlyData", JSON.stringify(updatedData));
  };

  const calculateTotalExpenses = (fixed, variable) => {
    const fixedTotal = fixed.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const variableTotal = variable.reduce((total, expense) => total + parseFloat(expense.expense), 0);
    return fixedTotal + variableTotal;
  };

  const getChartData = () => {
    return {
      labels: monthlyData.map((data) => data.month),
      datasets: [{
        label: "Υπολειπόμενα χρήματα κάθε μήνα",
        data: monthlyData.map((data) => data.income - calculateTotalExpenses(data.fixedExpenses, data.variableExpenses)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#8a70e1", 
        }
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#8a70e1", 
        }
      }
    }
  };

  return (
    <div className="app-container"> 
      <h1>Expense Tracker</h1> 
      <h2>Current Month: {currentMonth}</h2>

      <div className="input-grid">
        <IncomeInput onIncomeSubmit={setIncome} income={income} />
        <FixedExpensesInput fixedExpenses={fixedExpenses} onFixedExpensesSubmit={setFixedExpenses} />
        <VariableExpensesInput variableExpenses={variableExpenses} onVariableExpensesSubmit={setVariableExpenses} />
      </div>

      <button className="submit-button" onClick={handleSubmitExpenses}>Submit Expenses</button>

      {isSubmitted && (
        <div className="summary">
          <h2>Month details for: {currentMonth}</h2>
            <div className="info">
              <p>Income: {income} €</p>
              <p>Total Expenses: {calculateTotalExpenses(fixedExpenses, variableExpenses)} €</p>
              <p>Remaining Money: {income - calculateTotalExpenses(fixedExpenses, variableExpenses)} €</p>
            </div>
        </div>
      )}

      <button
        onClick={() => setIsHistoryVisible(!isHistoryVisible)}
        className="history-button"
      >
        Month History
      </button>

      {isHistoryVisible && (
        <div className="history-container">
          <ul className="history-list">
            {monthlyData.map((data, index) => (
              <li key={index}>
                <strong>{data.month}</strong>: Income {data.income} €, Expenses {calculateTotalExpenses(data.fixedExpenses, data.variableExpenses)} €, Remaining Money {data.income - calculateTotalExpenses(data.fixedExpenses, data.variableExpenses)} €
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Expense Chart</h3>
      <Line data={getChartData()} options={chartOptions} />
    </div>
  );
}

export default App;
