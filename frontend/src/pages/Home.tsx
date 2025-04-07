import { useState, useEffect } from "react";
import api from "../api";
import Expense from "../components/Expense";
import { ExpenseType } from "../types/Expense";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const Home = () => {
  
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); //will need to make a change for drop down menu
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    api
      .get("api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deleteExpense = (id: number) => {
    api
      .delete(`/api/expenses/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Expense Deleted!");
        else alert("Failed to delete expense");
        getExpenses();
      })
      .catch((error) => alert(error));
  };

  const createExpense = (e: any) => {
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
      });
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {expenses.map((expense: ExpenseType) => (
          <Expense
            expense={expense}
            onDelete={deleteExpense}
            key={expense.id}
          />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createExpense}>
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

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Home;
