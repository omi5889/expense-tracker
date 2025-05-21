import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState('');
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    let url = 'http://localhost:8080/api/expenses';
    if (month) {
      url += `?month=${month}`;
    }
    const res = await axios.get(url);
    setExpenses(res.data);

    // Calculate total
    const sum = res.data.reduce((acc, exp) => acc + exp.amount, 0);
    setTotal(sum);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh, month]);

  return (
    <div>
      <h2>Expenses</h2>

      <label>Filter by month: </label>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <h3>Total: ${total}</h3>

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
