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
import { AssignmentTable } from "./AssignmentTable";

interface TeacherAssignmentCardProps {
  courseCode: string; // Course code
  courseTitle: string; // Course title
  courseDescription: string; // Course description
  hasAttachment: boolean; // Indicates if there is an attachment
  attachmentLink?: string; // Link for the attachment
  deadline: string; // Deadline for the assignment
}

const TeacherAssignmentCard: React.FC<TeacherAssignmentCardProps> = ({
  courseCode,
  courseTitle,
  courseDescription,
  hasAttachment,
  attachmentLink,
  deadline
}) => {
  const [deadlineOver, setDeadlineOver] = useState(false);

  // Check if the deadline has passed
  useEffect(() => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    setDeadlineOver(today > deadlineDate);
  }, [deadline]);

  return (
    <Card className="w-25vw">
      <CardHeader>
        <CardDescription>{courseCode}</CardDescription>
        <CardTitle>{courseTitle}</CardTitle>
        <CardDescription>{courseDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center space-x-2">
        <h1 className="text-red-500 font-bold">Deadline</h1>
        <p>: {deadline}</p>
        {deadlineOver && (
          <span className="text-red-600 font-semibold ml-2">
            (Deadline Over)
          </span>
        )}
      </CardContent>
      {hasAttachment && attachmentLink && (
        <CardContent className="flex flex-row">
          <Button variant="outline" className="w-40 h-8">
            <a href={attachmentLink} target="_blank" rel="noopener noreferrer">
              Download Attachment
            </a>
          </Button>
        </CardContent>
      )}
      <CardFooter>
        <Drawer>
          <DrawerTrigger>
            <Button disabled={deadlineOver}>Show submission</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <AssignmentTable />
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
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

export default TeacherAssignmentCard;
