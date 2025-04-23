import { useState, useEffect, ChangeEvent } from "react";
import api from "../api";
import ExpenseView from "../components/ExpenseView";
import { Expense } from "../types/Expense";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import ExpenseTable from "../components/ExpenseTable";
import './../styles/AddExpenseForm.css'
import './../styles/Home.css'

import { PlaidLinkButton } from "../components/PlaidLinkButton";

interface Transaction {
  transaction_id: number;
  category: string;
  name:string;
  amount: number;
  date: string;
}

const Home = () => {
  const [isAddExpenseFormOpen, setIsAddExpenseFormOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); //will need to make a change for drop down menu
  const [date, setDate] = useState(new Date());

  
  const [totalExpenses, setTotalExpenses] = useState(0);

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


  const getExpenses = () => {
    api
      .get("api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        let total = 0;
        for (let i = 0; i < data.length; i++)
        {
          total += parseFloat(data[i].amount);
        }
        setTotalExpenses(total);
      })
      .catch((error) => alert(error));
  }; 
  getExpenses();


  const createExpense = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/api/expenses/", {
        title,
        description,
        amount,
        date: date.toISOString().split("T")[0],
        category,
      })
      .then((res) => {
        if (res.status === 201) alert("Expense created!");
        else alert("Failed to create expense");
        getExpenses();
        clearEntry();
      });
  };
  
  const clearEntry = () => {
    setTitle("");
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(new Date());

  }

  const handleOpenAddExpenseForm = () => 
  {
    setIsAddExpenseFormOpen(true);
  };
  
  const handleCloseAddExpenseForm = () => 
  {
    setIsAddExpenseFormOpen(false);
  }

  const labelStyle ={
    fontSize: '25px',
  };

  return (
    <div>
      <label style={labelStyle}>TOTAL EXPENSE: {totalExpenses}</label>
      <br/>

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

      <button className="add-expense-button btn" onClick={handleOpenAddExpenseForm}>ADD EXPENSE</button>
      {isAddExpenseFormOpen && (
        <div className="overlay">
          <div className="form-container">
            <h2>Add Expense Form</h2>
            <form onSubmit={createExpense}>
              {/* Form fields go here */}
              <label htmlFor="title">Title:</label>
              <br />
              <input
                className="input"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <br />
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                className="textarea input-md"
                id="description"
                name="description"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <br />

              {/* Amount field */}
              <label htmlFor="amount">Amount:</label>
              <br />
              <input
                className="input"
                type="number"
                id="amount"
                name="amount"
                placeholder= "$0.00"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />

              {/* Category field */}
              <label htmlFor="category">Category:</label>
              <br />
              <select
                id="category"
                name="category"
                className = "btn m-1"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="text-left">Select a category</option>
                <option className="text-left" value="Leisure">Leisure</option>
                <option className="text-left" value="Expense">Expense</option>
                <option className="text-left" value="Savings">Savings</option>
              </select>
              <br />

              {/* Add a DatePicker field */}
              <label htmlFor="date">Date:</label>
              <br />
              <DatePicker 
                selected={date}
                onChange={(date: Date | null) => date && setDate(date)} // Update date when user selects a date
                //dateFormat="yyyy-MM-dd" // Optional: Format the date in a preferred way
              />
              <br />
              <button type="submit" className="btn bg-green-600 text-emerald-50">Add Expense</button>
              <button className="btn bg-red-600 text-emerald-50" onClick={handleCloseAddExpenseForm}>
                Exit
              </button>
            </form>
          </div>
        </div>
      )}

      <ExpenseTable dataChanged={dataChanged}/>
    </div>
  );
};

export default Home;
