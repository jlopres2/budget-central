import React, { useState, useEffect } from 'react';
import Transaction from '../interface/Transaction';


import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

type TransactionTableProps = {
  transactions: Transaction[];
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    //will have to change this
  },
  {
    accessorKey: "amount",
    header: "Amount($)",
    cell: info => info.getValue<number>().toFixed(2),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-2 border">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;