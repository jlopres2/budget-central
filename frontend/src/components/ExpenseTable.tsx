import { Expense } from "../types/Expense";
import React, { useReducer, useState, FormEvent } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'


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
interface TableProps
{
    expenseList: Expense[];
}

function ExpenseTable({expenseList}: TableProps){
    const [data, setData] = useState<Expense[]>([...expenseList]);

    const [serachValue, setSearchValue] = useState("");
    const [inputSearchValue, setInputSearchValue] = useState("");
  
    // setData(expenseList);

    const submitSearchForm = (e: FormEvent) => {
      e.preventDefault();
      setSearchValue(inputSearchValue);
    }




    const table = useReactTable({
          data: data,
          columns,
          debugTable: true,
          getCoreRowModel: getCoreRowModel(),
      })

    return (
      <div>
        <div className="search-bar">
          <form onSubmit={submitSearchForm}>
            <input
              type="text"
              placeholder="Search..."
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.target.value)}
            />
          </form>
        </div>

        <table className="users-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="users-table-cell">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
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
                  <td key={cell.id} className="users-table-cell">
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