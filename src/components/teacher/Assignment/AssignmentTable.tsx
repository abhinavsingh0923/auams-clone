"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data
const data: Assignment[] = [
    { id: "1", status: "submitted", name: "John Doe", fileLink: "https://example.com/submitted-assignment-1.pdf" },
    { id: "2", status: "pending", name: "Jane Smith", fileLink: "" },
    { id: "3", status: "submitted", name: "Mike Johnson", fileLink: "https://example.com/submitted-assignment-2.pdf" },
    { id: "4", status: "submitted", name: "Emily Davis", fileLink: "https://example.com/submitted-assignment-3.pdf" },
    { id: "5", status: "pending", name: "Chris Brown", fileLink: "" },
    { id: "6", status: "submitted", name: "Anna Wilson", fileLink: "https://example.com/submitted-assignment-4.pdf" },
    { id: "7", status: "submitted", name: "Tom Lee", fileLink: "https://example.com/submitted-assignment-5.pdf" },
    { id: "8", status: "pending", name: "Sarah Kim", fileLink: "" },
    { id: "9", status: "submitted", name: "David Martinez", fileLink: "https://example.com/submitted-assignment-6.pdf" },
    { id: "10", status: "submitted", name: "Samantha Green", fileLink: "https://example.com/submitted-assignment-7.pdf" },
    { id: "11", status: "pending", name: "James White", fileLink: "" },
    { id: "12", status: "submitted", name: "Karen Walker", fileLink: "https://example.com/submitted-assignment-8.pdf" },
    { id: "13", status: "pending", name: "Aaron Gonzalez", fileLink: "" },
    { id: "14", status: "submitted", name: "Olivia Thompson", fileLink: "https://example.com/submitted-assignment-9.pdf" },
    { id: "15", status: "submitted", name: "Benjamin Scott", fileLink: "https://example.com/submitted-assignment-10.pdf" },
    { id: "16", status: "pending", name: "Jessica Moore", fileLink: "" },
    { id: "17", status: "submitted", name: "Daniel Taylor", fileLink: "https://example.com/submitted-assignment-11.pdf" },
    { id: "18", status: "submitted", name: "Sophia Adams", fileLink: "https://example.com/submitted-assignment-12.pdf" },
    { id: "19", status: "pending", name: "Matthew Parker", fileLink: "" },
    { id: "20", status: "submitted", name: "Rachel Hall", fileLink: "https://example.com/submitted-assignment-13.pdf" },
    { id: "21", status: "pending", name: "Joshua Allen", fileLink: "" },
    { id: "22", status: "submitted", name: "Chloe Nelson", fileLink: "https://example.com/submitted-assignment-14.pdf" },
    { id: "23", status: "submitted", name: "Ryan Young", fileLink: "https://example.com/submitted-assignment-15.pdf" },
    { id: "24", status: "pending", name: "Ava King", fileLink: "" },
    { id: "25", status: "submitted", name: "Liam Wright", fileLink: "https://example.com/submitted-assignment-16.pdf" },
    { id: "26", status: "pending", name: "Mason Clark", fileLink: "" },
    { id: "27", status: "submitted", name: "Megan Harris", fileLink: "https://example.com/submitted-assignment-17.pdf" },
    { id: "28", status: "submitted", name: "Ethan Lewis", fileLink: "https://example.com/submitted-assignment-18.pdf" },
    { id: "29", status: "pending", name: "Isabella Robinson", fileLink: "" },
    { id: "30", status: "submitted", name: "Lucas Walker", fileLink: "https://example.com/submitted-assignment-19.pdf" },
    { id: "31", status: "submitted", name: "Mia Hill", fileLink: "https://example.com/submitted-assignment-20.pdf" },
    { id: "32", status: "pending", name: "Elijah Green", fileLink: "" },
    { id: "33", status: "submitted", name: "Harper Baker", fileLink: "https://example.com/submitted-assignment-21.pdf" },
    { id: "34", status: "pending", name: "Michael Hall", fileLink: "" },
    { id: "35", status: "submitted", name: "Ella Campbell", fileLink: "https://example.com/submitted-assignment-22.pdf" },
    { id: "36", status: "submitted", name: "Alexander Mitchell", fileLink: "https://example.com/submitted-assignment-23.pdf" },
    { id: "37", status: "pending", name: "Grace Carter", fileLink: "" },
    { id: "38", status: "submitted", name: "William Perez", fileLink: "https://example.com/submitted-assignment-24.pdf" },
    { id: "39", status: "pending", name: "Amelia Collins", fileLink: "" },
    { id: "40", status: "submitted", name: "Zoe Stewart", fileLink: "https://example.com/submitted-assignment-25.pdf" },
    { id: "41", status: "submitted", name: "Henry Flores", fileLink: "https://example.com/submitted-assignment-26.pdf" },
    { id: "42", status: "pending", name: "Avery Rogers", fileLink: "" },
    { id: "43", status: "submitted", name: "Jack Reed", fileLink: "https://example.com/submitted-assignment-27.pdf" },
    { id: "44", status: "pending", name: "Natalie Diaz", fileLink: "" },
    { id: "45", status: "submitted", name: "Olivia Cox", fileLink: "https://example.com/submitted-assignment-28.pdf" },
    { id: "46", status: "submitted", name: "Jayden Ward", fileLink: "https://example.com/submitted-assignment-29.pdf" },
    { id: "47", status: "pending", name: "Lily Bennett", fileLink: "" },
    { id: "48", status: "submitted", name: "Sebastian Gray", fileLink: "https://example.com/submitted-assignment-30.pdf" },
    { id: "49", status: "pending", name: "Zara Murphy", fileLink: "" },
    { id: "50", status: "submitted", name: "Owen Martinez", fileLink: "https://example.com/submitted-assignment-31.pdf" },
  ];
  

export type Assignment = {
  id: string;
  status: "submitted" | "pending";
  name: string;
  fileLink: string;
};

export const columns: ColumnDef<typeof data[0]>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID No.",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      id: "viewFile",
      header: "View File",
      cell: ({ row }) => {
        const fileLink = row.original.fileLink;
        return fileLink ? (
          <Button asChild>
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </Button>
        ) : (
          <span>No File</span>
        );
      },
    },
  ];
  

export function AssignmentTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable<Assignment>({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No assignments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
