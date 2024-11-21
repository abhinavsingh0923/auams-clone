import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface AssignmentCardProps {
  courseCode: string;         // Course code
  courseTitle: string;        // Course title
  courseDescription: string;  // Course description
  hasAttachment: boolean;      // Indicates if there is an attachment
  attachmentLink?: string;    // Link for the attachment
  deadline: string;           // Deadline for the assignment
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  courseCode,
  courseTitle,
  courseDescription,
  hasAttachment,
  attachmentLink,
  deadline,
}) => {
  return (
    <Card className="w-25vw">
      <CardHeader>
        <CardDescription>{courseCode}</CardDescription>
        <CardTitle>{courseTitle}</CardTitle>
        <CardDescription>{courseDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row">
        <h1 className="text-red-500 font-bold">Deadline</h1>
        <p>: {deadline}</p>
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
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
