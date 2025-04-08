import React from "react";
import "../styles/Expense.css"
import { Expense } from "../types/Expense";

interface ExpenseViewProps{
    expense: Expense;
    onDelete: (id: number) => void;
}

const ExpenseView: React.FC<ExpenseViewProps> = ({ expense, onDelete }) => {
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
export default ExpenseView