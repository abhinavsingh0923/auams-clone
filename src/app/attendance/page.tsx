"use client"; // Ensure this is at the top of the file if you're using Next.js

import React, { useState } from "react";
import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/ui/combobox";
import AttendanceCard from "@/components/teacher/Attendance/AttendanceCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer"; 
import { AttendanceTable } from "@/components/teacher/Attendance/AttendanceTable";


const userRole = "teacher";

export default function AttendancePage() {
  const [lectureCreated, setLectureCreated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCreateLecture = () => {
    setLectureCreated(true); // Indicate that a lecture has been created
    setDialogOpen(false); // Close the dialog
    setDrawerOpen(true); // Open the drawer
  };

  const today = new Date().toISOString().split("T")[0];

  const attendanceData = [
    {
      courseCode: "ECE101",
      courseTitle: "Electronics Fundamentals",
      batch: "Batch A",
      date: "2024-10-27",
    },
    {
      courseCode: "ECE102",
      courseTitle: "Digital Systems",
      batch: "Batch B",
      date: today, // Today's date
    },
    {
      courseCode: "ECE103",
      courseTitle: "Communication Theory",
      batch: "Batch C",
      date: "2024-10-25",
    },
  ];

  return (
    <ContentLayout title="Attendance">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Attendance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent className="w-full h-full">
        {userRole === "teacher" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Mark Attendance</h2>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setDialogOpen(true)}>
                    Create Lecture
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Lecture</DialogTitle>
                    <DialogDescription>
                      Enter the lecture details below. Click "Save" when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseCode" className="text-right">
                        Course Code
                      </Label>
                      <ComboboxDemo />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseTitle" className="text-right">
                        Course Title
                      </Label>
                      <Input id="courseTitle" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="batch" className="text-right">
                        Batch
                      </Label>
                      <ComboboxDemo />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input type="date" id="date" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleCreateLecture}>
                      Create Lecture
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {attendanceData.map((attendance, index) => (
                <AttendanceCard
                  key={index}
                  courseCode={attendance.courseCode}
                  courseTitle={attendance.courseTitle}
                  batch={attendance.batch}
                  date={attendance.date}
                />
              ))}
            </div>
          </div>
        )}

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Take Attendance</DrawerTitle>
              <DrawerDescription>Mark attendance for the selected lecture.</DrawerDescription>
            </DrawerHeader>
            <AttendanceTable/>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PlaceholderContent>
    </ContentLayout>
  );
}
