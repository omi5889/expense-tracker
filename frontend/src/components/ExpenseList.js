import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:8080/api/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);  // Refresh when trigger changes

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.date} - ${exp.amount} ({exp.category}): {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
