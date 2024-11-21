"use client"; // Ensure this is at the top of the file if you're using Next.js

import React from "react"; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// Define the shape of a single attendance item
interface AttendanceItem {
  courseCode: string;
  courseTitle: string;
  attendance: number;
  dates: Date[]; // Array of dates for this attendance item
}

// Define the props for the component
interface AttendanceTableListProps {
  attendanceData: AttendanceItem[]; // Array of attendance items passed from parent
}

// Function to determine the progress bar color based on attendance value
const getProgressColor = (value: number) => {
  if (value >= 85) return "bg-green-500"; // High attendance
  if (value >= 75) return "bg-yellow-500"; // Medium attendance
  return "bg-red-500"; // Low attendance
};

const Attendancetablelist: React.FC<AttendanceTableListProps> = ({
  attendanceData,
}) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

  const handleSelectDate = (dates: Date[] | undefined) => {
    if (!dates) return;
    setSelectedDates(dates);
  };

  return (
    <Table className="min-w-full">
      <TableCaption>A list of your recent attendance records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Course Code</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead className="text-right">Attendance</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((item) => (
          <TableRow key={item.courseCode} className="hover:bg-gray-50">
            <TableCell className="font-medium">{item.courseCode}</TableCell>
            <TableCell>{item.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Progress
                className="bg-gray-200"
                color={getProgressColor(item.attendance)}
                value={item.attendance}
              />
            </TableCell>
            <TableCell className="text-right">{item.attendance}%</TableCell>
            {/* Drawer Trigger Button */}
            {/* <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="ml-2">
                  Open
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Select Dates</DrawerTitle>
                  <DrawerDescription>
                    Select the attendance dates for this course.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Calendar
                    mode="multiple" // Allow selecting multiple dates
                    selected={selectedDates}
                    onSelect={handleSelectDate} // Handle date selection
                    className="rounded-md border"
                  />
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Attendancetablelist;
