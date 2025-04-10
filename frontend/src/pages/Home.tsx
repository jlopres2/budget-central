import { useState, useEffect, ChangeEvent } from "react";
import api from "../api";
import ExpenseView from "../components/ExpenseView";
import { Expense } from "../types/Expense";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import ExpenseTable from "../components/ExpenseTable";
import './../styles/AddExpenseForm.css'

const Home = () => {
  const [isAddExpenseFormOpen, setIsAddExpenseFormOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); //will need to make a change for drop down menu
  const [date, setDate] = useState(new Date());

  
  const [totalExpenses, setTotalExpenses] = useState(0);



  const getExpenses = () => {
    api
      .get("api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
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
        console.log("CREATED");
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

      <button className="add-expense-button" onClick={handleOpenAddExpenseForm}>ADD EXPENSE</button>
      {isAddExpenseFormOpen && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-button" onClick={handleCloseAddExpenseForm}>
              X
            </button>
            <h2>Add Expense Form</h2>
            <form onSubmit={createExpense}>
              {/* Form fields go here */}
              <label htmlFor="title">Title:</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <br />
              <label htmlFor="description">description:</label>
              <br />
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <br />

              {/* Amount field */}
              <label htmlFor="amount">Amount:</label>
              <br />
              <input
                type="number"
                id="amount"
                name="amount"
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
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Leisure">Leisure</option>
                <option value="Expense">Expense</option>
                <option value="Savings">Savings</option>
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
              <button type="submit">Add Expense</button>
            </form>
          </div>
        </div>
      )}

      <ExpenseTable dataChanged={dataChanged}/>
      <h2>Create an Expense</h2>
    </div>
  );
};

export default Home;
