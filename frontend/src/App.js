import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
    fetchPieChart();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/api/transactions`, {
        params: { month, search, page },
      });
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const { data } = await axios.get(`/api/statistics`, { params: { month } });
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChart = async () => {
    try {
      const { data } = await axios.get(`/api/bar-chart`, { params: { month } });
      setBarChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const fetchPieChart = async () => {
    try {
      const { data } = await axios.get(`/api/pie-chart`, { params: { month } });
      setPieChartData(data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Transactions Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '5px', width: '300px' }}
        />
      </div>
      
      <table border="1" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.title}</td>
              <td>{txn.description}</td>
              <td>{txn.price}</td>
              <td>{txn.category}</td>
              <td>{txn.sold ? 'Yes' : 'No'}</td>
              <td>{txn.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} style={{ marginRight: '10px' }}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Statistics</h2>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Unsold Items: {statistics.totalUnsoldItems}</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Bar Chart</h2>
        <ul>
          {barChartData.map((range) => (
            <li key={range.range}>
              {range.range}: {range.count} items
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Pie Chart</h2>
        <ul>
          {pieChartData.map((category) => (
            <li key={category.name}>
              {category.name}: {category.count} items
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
