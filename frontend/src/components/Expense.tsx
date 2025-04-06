import React from "react";
import "../styes/Expense.css"

// interface ExpenseProp{
//     title: string;
//     description: string;
//     amount: number;
//     category: string;
//     date: string;
// }

function Expense({ expense, onDelete }) {
    // const formattedDate = new Date(expense.created_at).toLocaleDateString("en-US")

    return (
        <div className="expense-container">
            <p className="expense-title">{expense.title}</p>
            <p className="expense-description">{expense.description}</p>
            <p className="expense-amount">{expense.amount}</p>
            <p className="expense-category">{expense.category}</p>
            <p className="expense-date">{expense.date}</p>
            
        
            <button className="delete-button" onClick={() => onDelete(expense.id)}>
                Delete
            </button>
        </div>
    );
}
export default Expense