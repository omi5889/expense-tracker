import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ExpenseList({ refresh }) {
  const [allExpenses, setAllExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [month, setMonth] = useState('');
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchExpenses = async () => {
    let url = `${API_BASE_URL}/api/expenses`;
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await axios.delete(`${API_BASE_URL}/api/expenses/${id}`);
      fetchExpenses(); // refresh list
    }
  };

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditData({
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description
    });
  };

  const handleSave = async (id) => {
    await axios.put(`${API_BASE_URL}/api/expenses/${id}`, {
      ...editData,
      amount: parseFloat(editData.amount)  // ensure amount is numeric
    });
    setEditingId(null);
    fetchExpenses(); // refresh list
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };



  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expenses</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Filter by month:</label>
          <input
            type="month"
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Filter by category:</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categoryOptions.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h4>Total: ${total}</h4>

      <ul className="list-group">
        {filteredExpenses.map((exp) => (
          <li key={exp.id} className="list-group-item">
            {editingId === exp.id ? (
              <div className="row g-2 align-items-center">
                <div className="col-md-2">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={editData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={editData.amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={editData.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={editData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSave(exp.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{exp.date}</strong> — ₹{exp.amount}
                  <span className="text-muted"> ({exp.category})</span><br />
                  {exp.description}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditClick(exp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}

      </ul>
    </div>

  );
}

export default ExpenseList;
