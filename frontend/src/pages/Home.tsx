import { useState, useEffect } from "react"
import api from "../api"
import DatePicker from "react-datepicker"
import Expense from "../components/Expense"

// import DatePick from "./../components/PickDate"
const Home = () => {
  type ExpenseType = {
    title: string;
    description: string;
    amount: number;
    category: string;
    date: string;
  }
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(""); //will need to make a change for drop down menu
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    getExpenses();
  })

  const getExpenses = () => {
    api
      .get("api/expenses/")
      .then((res) => res.data)
      .then((data) => {setExpenses(data); console.log(data)})
      .catch((error) => alert(error))
  }

  const deleteExpense = (id: number) => {
    api.delete(`/api/expenses/delete/${id}`).then((res) => {
      if (res.status === 204) alert("Expense Deleted!");
      else alert("Failed to delete expense");
    }).catch((error) => alert(error));
    getExpenses(); // should be removing from expenses list on TS
  }

  const createExpense = (e: any) => {
    e.preventDefult();
    api
      .post("/api/expenses/", {title, description, amount, date, category })
      .then((res) => {
        if (res.status === 201) alert("Expense created!");
        else alert("Failed to create expense");
      })
    }


  
  return (
    <div>
      <div>
        <h2>Notes</h2>
            {expenses.map((expense:ExpenseType) => (
              <Expense expense={expense} onDelete={deleteExpense} key={expense.id} />
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
          <input type="submit" value="Submit"></input>
        </form> 

        {/* <form>
          <DatePicker 
            selected = {date}
            onChange={date => date && setDate(date)}
           />
        </form> */}
    </div>
  )
}

export default Home