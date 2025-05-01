import { useState, useEffect } from "react";
import api from "../api.ts";
import Transaction from "../interface/Transaction.ts"
import './../styles/TransactionsPage.css'

import { PlaidLinkButton } from "../components/PlaidLinkButton.tsx";
import TransactionsTable from "../components/TransactionTable.tsx";

import TransactionFilter from "../components/TransactionFilter.tsx";


import {categoryOptions, CategoryOption} from "../types/TransactionCategoryOptions.ts";


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [searchTextFilter, setSearchText] = useState<string>('');
  const [categoriesFilter, setCategoriesFilter] = useState<CategoryOption[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);


  const fetchTransactions = async () => {
    const token = localStorage.getItem('plaid_access_token');

    if (!token)
    {
      console.log("User does not have any bank information connect");
      return;
    } 

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
    if (localStorage.getItem("plaid_access_token")) { //will need to store this on database 
      fetchTransactions();
    }
  }, []);


  return (
    <div className="h-screen flex flex-col p-4">
      {/* Top row: 2 boxes side by side */}
      <div className="flex flex-row space-x-4">
        {/* Top Left Box */}
        <div className="flex-1 card  bg-base-300 text-primary-content rounded-box shadow-lg flex items-center justify-center">
          <div className="card-body">
              <TransactionFilter setSearchCallback={setSearchText} setCategoriesCallback={setCategoriesFilter} setDateCallback={setDateFilter}/>
          </div>
        </div>

        {/* Top Right Box */}
        <div className="w-1/4 card bg-base-300 text-green-400 rounded-box shadow-lg flex items-center justify-center">
          <div className="card-body">

            <PlaidLinkButton onSuccessCallback={fetchTransactions} />
            <button
              onClick={fetchTransactions}
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded"
            >
              Refresh Transactions
            </button>

          </div>
        </div>
      </div>

      {/* Bottom box fills rest of screen */}
      <div className="flex-1 card  bg-base-300 text-accent-content mt-8 mb-8 rounded-box shadow-lg flex items-center justify-center">
        <div className="flex-2 card-body">
          {/* <ul> */}
            {/* {transactions.map((txn) => (
              <li key={txn.transaction_id} className="border rounded p-4 mb-2">
                <div className="font-semibold">{txn.name}</div>
                <div>${txn.amount} on {txn.date}</div>
              </li>
            ))} */}
             {/* </ul> */}
            <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );

};

export default TransactionsPage;
