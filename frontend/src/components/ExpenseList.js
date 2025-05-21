import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList({ refresh }) {
  const [allExpenses, setAllExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    let url = 'http://localhost:8080/api/expenses';
    if (month) {
      url += `?month=${month}`;
    }
    const res = await axios.get(url);
    setAllExpenses(res.data);
  };

  // Apply category filter on fetched data
  useEffect(() => {
    let filtered = [...allExpenses];

    if (category) {
      filtered = filtered.filter((exp) => exp.category === category);
    }

    setFilteredExpenses(filtered);

    // Calculate total
    const sum = filtered.reduce((acc, exp) => acc + exp.amount, 0);
    setTotal(sum);
  }, [allExpenses, category]);

  useEffect(() => {
    fetchExpenses();
  }, [refresh, month]);

  // Get list of categories from current data
  const categoryOptions = [...new Set(allExpenses.map((exp) => exp.category))];

  return (
    <div>
      <h2>Expenses</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by month: </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        &nbsp;&nbsp;
        <label>Filter by category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {categoryOptions.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h3>Total: ${total}</h3>

      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp.id}>
            {exp.date} - ${exp.amount} ({exp.category}): {exp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
