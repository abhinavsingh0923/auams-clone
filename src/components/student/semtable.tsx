"use client";

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Define types for semester and subject data
export type SemesterData = {
  Year: string;
  Semester: string;
  marks: number;
  subjects: { name: string; marks: number }[]; // Array of subjects and marks
};

// Sample semester data with dummy subject marks
const data: SemesterData[] = [
  {
    Year: "Year 1",
    Semester: "Sem 1",
    marks: 85,
    subjects: [
      { name: "Mathematics", marks: 85 },
      { name: "Physics", marks: 90 },
      { name: "Chemistry", marks: 80 },
    ],
  },
  {
    Year: "Year 1",
    Semester: "Sem 2",
    marks: 90,
    subjects: [
      { name: "Mathematics II", marks: 88 },
      { name: "Biology", marks: 92 },
      { name: "Computer Science", marks: 85 },
    ],
  },
  {
    Year: "Year 2",
    Semester: "Sem 1",
    marks: 78,
    subjects: [
      { name: "Statistics", marks: 78 },
      { name: "Electronics", marks: 75 },
      { name: "Mechanics", marks: 80 },
    ],
  },
  {
    Year: "Year 2",
    Semester: "Sem 2",
    marks: 88,
    subjects: [
      { name: "Advanced Physics", marks: 86 },
      { name: "Signal Processing", marks: 90 },
      { name: "Microprocessors", marks: 88 },
    ],
  },
  // Add similar objects for Year 3 and Year 4
];

// Define columns for the main semester table
export const columns: ColumnDef<SemesterData>[] = [
  {
    accessorKey: "Year",
    header: "Year",
  },
  {
    accessorKey: "Semester",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Semester
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "marks",
    header: () => <div className="text-right">Marks</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Show Marks</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Marks for {row.original.Year} - {row.original.Semester}</DrawerTitle>
              <DrawerDescription>
                Detailed marks for each subject in this semester.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-6 py-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {row.original.subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.marks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DrawerFooter>
              <Button>Close</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    ),
  },
];

export function SemTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter semesters..."
          value={(table.getColumn("Semester")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Semester")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                <TableRow key={row.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
