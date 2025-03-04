import React, { useState } from "react";

const IncomeInput = ({ onIncomeSubmit }) => {
  const [income, setIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income !== "") {
      onIncomeSubmit(income); 
    }
  };

  return (
    <div>
      <h2>Income</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter your monthly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button type="submit">Save Income</button>
      </form>
    </div>
  );
};

export default IncomeInput;
