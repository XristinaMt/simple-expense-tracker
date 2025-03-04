import React, { useState } from "react";

const VariableExpensesInput = ({ variableExpenses, onVariableExpensesSubmit }) => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");

  const handleAddExpense = () => {
    if (expense && category) {
      const newExpense = { expense, category };
      onVariableExpensesSubmit([...variableExpenses, newExpense]);
      setExpense("");
      setCategory("");
    }
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = variableExpenses.filter((_, i) => i !== index);
    onVariableExpensesSubmit(updatedExpenses);
  };

  const handleEditExpense = (index, updatedExpense) => {
    const updatedExpenses = variableExpenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    onVariableExpensesSubmit(updatedExpenses);
  };

  return (
    <div>
      <h2>Variable Expenses</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <button onClick={handleAddExpense}>Input Variable Expense</button>

      {variableExpenses.length > 0 && (
        <div>
          <h3>Variable Expenses List:</h3>
          <ul>
            {variableExpenses.map((expense, index) => (
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
                  {expense.category}: {expense.expense} €
                </span>
                <div style={{ display: "flex", flexDirection: "row", gap: "3px",marginBottom: "1px" ,marginBottom: "8px",}}>
                  <button 
                    style={{ fontSize: "12px", padding: "3px 3px" }}
                    onClick={() =>
                      handleEditExpense(index, {
                        expense: prompt("New Amount:", expense.expense),
                        category: prompt("New Category:", expense.category),
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

export default VariableExpensesInput;
