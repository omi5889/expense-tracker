import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/api/expenses`, form);
    onAdd();  // Refresh expense list
    setForm({ amount: '', category: '', description: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
