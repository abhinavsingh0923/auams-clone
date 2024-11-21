import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { AssignmentTable } from "../Assignment/AssignmentTable";

interface AttendanceCardProps {
  courseCode: string;
  courseTitle: string;
  batch: string;
  date: string;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  courseCode,
  courseTitle,
  batch,
  date
}) => {
  return (
    <Card className="w-25vw">
      <CardHeader>
        <CardDescription>Course Code: {courseCode}</CardDescription>
        <CardTitle>{courseTitle}</CardTitle>
        <CardDescription>Batch: {batch}</CardDescription>
        <CardDescription>Date: {date}</CardDescription>
      </CardHeader>
      <CardFooter className="flex space-x-4">
          <Drawer>
            <DrawerTrigger>
            <Button variant="outline">Edit Attendance</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Take Attendance for {courseTitle}</DrawerTitle>
                <DrawerDescription>
                  Mark attendance for {batch} - {date}
                </DrawerDescription>
              </DrawerHeader>
              <AssignmentTable />
              <DrawerFooter>
                <Button>Save</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
      </CardFooter>
    </Card>
  );
};

export default AttendanceCard;
