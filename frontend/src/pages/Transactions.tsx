import { useState, useEffect } from "react";
import api from "../api";

import './../styles/Transactions.css'

import { PlaidLinkButton } from "../components/PlaidLinkButton";

interface Transaction {
  transaction_id: number;
  category: string;
  name:string;
  amount: number;
  date: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  const fetchTransactions = async () => {
    const token = localStorage.getItem('plaid_access_token');
    console.log("Sending token to backend:", localStorage.getItem("plaid_access_token"));

    if (!token) return;

    try {
      const res = await api.post('/api/transactions/', {
        access_token: token,
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("plaid_access_token")) {
      fetchTransactions();
    }
  }, []);

  return (
    <div className = "flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        <PlaidLinkButton onSuccessCallback={fetchTransactions} />
        <button
          onClick={fetchTransactions}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Refresh Transactions
        </button>

        <ul className="mt-4">
          {transactions.map((txn) => (
            <li key={txn.transaction_id} className="border rounded p-4 mb-2">
              <div className="font-semibold">{txn.name}</div>
              <div>${txn.amount} on {txn.date}</div>
            </li>
          ))}
        </ul>
      </div>

     
      {/* <ExpenseTable dataChanged={dataChanged}/> */}
    </div>
  );
};

export default Transactions;
