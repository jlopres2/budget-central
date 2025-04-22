import React, { useState, useEffect } from 'react';
    
interface transaction {
    transaction_id: string,
    date: string,
    name: string,
    amount: string,
}
const TransactionsTable = ({ accessToken }: { accessToken: string }) => {
  const [transactions, setTransactions] = useState([]);
    
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`/api/transactions?access_token=${accessToken}`);
      const data = await response.json();
  setTransactions(data.transactions);
    };
    if (accessToken) {
      fetchTransactions();
    }
  }, [accessToken]);
    
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction : transaction) => (
          <tr key={transaction.transaction_id}>
            <td>{transaction.date}</td>
            <td>{transaction.name}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
    
    export default TransactionsTable;