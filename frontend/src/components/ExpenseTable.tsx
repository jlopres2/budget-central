import { Expense } from "../types/Expense";
import React, { useReducer, useState, useEffect, FormEvent } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
  import api from "../api";
import "./../styles/ExpenseTable.css"

const columnHelper = createColumnHelper<Expense>();

const columns = [
  // columnHelper.accessor("id", {
  //   header: () => "ID",
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: () => "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: (info) => info.getValue(),
  }),
];

interface ExpenseTableProps {
  dataChanged: boolean;
}
function ExpenseTable(dataChanged: ExpenseTableProps){
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
      getExpenses();

    }, [dataChanged]);

    const getExpenses = () => {
      api
        .get("api/expenses/")
        .then((res) => res.data)
        .then((data) => {
          setExpenses(data);
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



    const table = useReactTable({
          data: expenses,
          columns,
          debugTable: true,
          getCoreRowModel: getCoreRowModel(),
      })

    return (
      <div>
        <table className="expense-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="expense-table-cell-header">
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="expense-table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
      </div>

      )

}
export default ExpenseTable