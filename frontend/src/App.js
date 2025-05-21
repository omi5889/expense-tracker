import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);  // Toggle to trigger list refresh
  };

  return (
    <div className="App">
      <h1>Personal Expense Tracker</h1>
      <ExpenseForm onAdd={triggerRefresh} />
      <ExpenseList refresh={refresh} />
    </div>
  );
}

export default App;
