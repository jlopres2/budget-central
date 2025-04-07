import React from "react";
import "../styles/Expense.css"
import { ExpenseType } from "../types/Expense";

interface ExpenseProps{
    expense: ExpenseType;
    onDelete: (id: number) => void;
}

const Expense: React.FC<ExpenseProps> = ({ expense, onDelete }) => {
    const formattedDate = new Date(expense.date).toLocaleDateString("en-US")

    return (
        <div className="expense-container">
            <p className="expense-title">{expense.title}</p>
            <p className="expense-description">{expense.description}</p>
            <p className="expense-amount">{expense.amount}</p>
            <p className="expense-category">{expense.category}</p>
            <p className="expense-date">{formattedDate}</p>
            
        
            <button className="delete-button" onClick={() => onDelete(expense.id)}>
                Delete
            </button>
        </div>
    );
}
export default Expense