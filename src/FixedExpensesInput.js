import React, { useState } from "react";

const FixedExpensesInput = ({ fixedExpenses, onFixedExpensesSubmit }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    if (category && amount) {
      const newExpense = { category, amount };
      onFixedExpensesSubmit([...fixedExpenses, newExpense]);
      setCategory("");
      setAmount("");
    }
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = fixedExpenses.filter((_, i) => i !== index);
    onFixedExpensesSubmit(updatedExpenses);
  };

  const handleEditExpense = (index, updatedExpense) => {
    const updatedExpenses = fixedExpenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    onFixedExpensesSubmit(updatedExpenses);
  };

  return (
    <div>
      <h2>Fixed Expenses</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddExpense}>Input Fixed Expense</button>

      {fixedExpenses.length > 0 && (
        <div>
          <h3>Fixed Expenses List:</h3>
          <ul>
            {fixedExpenses.map((expense, index) => (
              <li 
                key={index} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  marginBottom: "5px",
                  padding: "5px 10px", 
                  backgroundColor: "#8a70e1",
                  borderRadius: "5px",
                  fontSize: "14px",
                  minWidth: "150px",
                  marginRight: "60px",
                  marginLeft: "20px"
                }}
              >
                <span style={{ flex: 1 }}>
                  {expense.category}: {expense.amount} €
                </span>
                <div style={{ display: "flex", flexDirection: "row", gap: "3px" ,marginBottom: "8px", marginTop: "0.5px"}}>
                  <button 
                    style={{ fontSize: "12px", padding: "3px 5px" }}
                    onClick={() =>
                      handleEditExpense(index, {
                        category: prompt("New Category:", expense.category),
                        amount: prompt("New Amount:", expense.amount),
                      })
                    }
                  >
                    ✏️
                  </button>
                  <button 
                    style={{ fontSize: "12px", padding: "3px 5px" }}
                    onClick={() => handleRemoveExpense(index)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FixedExpensesInput;
