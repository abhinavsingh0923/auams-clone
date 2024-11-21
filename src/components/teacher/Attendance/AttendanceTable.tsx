import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialData: StudentAttendance[] = [
  { studentId: "S1001", studentName: "John Doe", isPresent: false },
  { studentId: "S1002", studentName: "Jane Smith", isPresent: false },
  { studentId: "S1003", studentName: "Michael Brown", isPresent: false },
  { studentId: "S1004", studentName: "Emily White", isPresent: false },
  { studentId: "S1005", studentName: "Chris Green", isPresent: false },
  { studentId: "S1006", studentName: "David Johnson", isPresent: false },
  { studentId: "S1007", studentName: "Sarah Davis", isPresent: false },
  { studentId: "S1008", studentName: "Chris Lee", isPresent: false },
  { studentId: "S1009", studentName: "Jessica Taylor", isPresent: false },
  { studentId: "S1010", studentName: "Daniel Anderson", isPresent: false },
  { studentId: "S1011", studentName: "Laura Martinez", isPresent: false },
  { studentId: "S1012", studentName: "Robert Garcia", isPresent: false },
  { studentId: "S1013", studentName: "Emily Wilson", isPresent: false },
  { studentId: "S1014", studentName: "James Moore", isPresent: false },
  { studentId: "S1015", studentName: "Anna Taylor", isPresent: false },
  { studentId: "S1016", studentName: "Henry Thomas", isPresent: false },
  { studentId: "S1017", studentName: "Elizabeth Jackson", isPresent: false },
  { studentId: "S1018", studentName: "Charles Harris", isPresent: false },
  { studentId: "S1019", studentName: "Patricia Clark", isPresent: false },
  { studentId: "S1020", studentName: "Steven Lewis", isPresent: false },
  { studentId: "S1021", studentName: "Michelle Robinson", isPresent: false },
  { studentId: "S1022", studentName: "Thomas Walker", isPresent: false },
  { studentId: "S1023", studentName: "Sandra Hall", isPresent: false },
  { studentId: "S1024", studentName: "Matthew Allen", isPresent: false },
  { studentId: "S1025", studentName: "Maria Young", isPresent: false },
  { studentId: "S1026", studentName: "Kevin Hernandez", isPresent: false },
  { studentId: "S1027", studentName: "Angela King", isPresent: false },
  { studentId: "S1028", studentName: "Edward Wright", isPresent: false },
  { studentId: "S1029", studentName: "Barbara Scott", isPresent: false },
  { studentId: "S1030", studentName: "Brian Green", isPresent: false },
  { studentId: "S1031", studentName: "Cynthia Adams", isPresent: false },
  { studentId: "S1032", studentName: "Donald Nelson", isPresent: false },
  { studentId: "S1033", studentName: "Melissa Carter", isPresent: false },
  { studentId: "S1034", studentName: "Jason Mitchell", isPresent: false },
  { studentId: "S1035", studentName: "Laura Perez", isPresent: false },
  { studentId: "S1036", studentName: "Joshua Roberts", isPresent: false },
  { studentId: "S1037", studentName: "Emily Turner", isPresent: false },
  { studentId: "S1038", studentName: "Amy Phillips", isPresent: false },
  { studentId: "S1039", studentName: "Jacob Campbell", isPresent: false },
  { studentId: "S1040", studentName: "Megan Parker", isPresent: false },
  { studentId: "S1041", studentName: "Andrew Evans", isPresent: false },
  { studentId: "S1042", studentName: "Samantha Edwards", isPresent: false },
  { studentId: "S1043", studentName: "Nicholas Collins", isPresent: false },
  { studentId: "S1044", studentName: "Laura Stewart", isPresent: false },
  { studentId: "S1045", studentName: "Matthew Sanchez", isPresent: false },
  { studentId: "S1046", studentName: "Victoria Morris", isPresent: false },
  { studentId: "S1047", studentName: "Zachary Rogers", isPresent: false },
  { studentId: "S1048", studentName: "Katherine Reed", isPresent: false },
  { studentId: "S1049", studentName: "Daniel Price", isPresent: false },
  { studentId: "S1050", studentName: "Jessica Cook", isPresent: false },
];

type StudentAttendance = {
  studentId: string;
  studentName: string;
  isPresent: boolean;
};

export function AttendanceTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [attendanceData, setAttendanceData] = React.useState(initialData);

  const columns: ColumnDef<StudentAttendance>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setAttendanceData((prevData) => {
              return prevData.map((student) => {
                if (student.studentId === row.original.studentId) {
                  return { ...student, isPresent: !!value };
                }
                return student;
              });
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "studentId",
      header: "ID No.",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("studentId")}</div>
      ),
    },
    {
      accessorKey: "studentName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("studentName")}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: attendanceData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSave = () => {
    const attendanceRecords = attendanceData.map((student) => ({
      studentId: student.studentId,
      studentName: student.studentName,
      isPresent: student.isPresent,
    }));
    console.log(attendanceRecords);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border max-h-96 overflow-auto"> {/* Set max height and enable scrolling */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center"> {/* Centered header */}
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center justify-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={handleSave} className="mt-4">
        Save Attendance
      </Button>
    </div>
  );
}
