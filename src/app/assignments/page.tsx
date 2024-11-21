"use client";
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
import AssignmentCard from "@/components/student/assignmentCard";
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import TeacherAssignmentCard from "@/components/teacher/Assignment/AssignmentCard";


// Hardcoded user role for development purposes
const userRole = "teacher";

const dummyAssignments = [
  {
    courseCode: "CS101",
    courseTitle: "Introduction to Computer Science",
    courseDescription: "Learn the basics of programming and computer science.",
    hasAttachment: true,
    attachmentLink: "https://example.com/attachments/cs101_intro.pdf",
    deadline: "2024-11-05",
  },
  {
    courseCode: "MATH202",
    courseTitle: "Calculus II",
    courseDescription: "Advanced calculus concepts and applications.",
    hasAttachment: false,
    attachmentLink: "",
    deadline: "2024-11-10",
  },
  {
    courseCode: "ENG303",
    courseTitle: "English Literature",
    courseDescription: "Study major works of English literature.",
    hasAttachment: true,
    attachmentLink: "https://example.com/attachments/eng303_lit.pdf",
    deadline: "2024-11-15",
  },
  {
    courseCode: "PHY404",
    courseTitle: "Physics: Mechanics",
    courseDescription: "Explore the principles of mechanics in physics.",
    hasAttachment: true,
    attachmentLink: "https://example.com/attachments/phy404_mechanics.pdf",
    deadline: "2024-11-20",
  },
  {
    courseCode: "BIO505",
    courseTitle: "Biology: Cell Biology",
    courseDescription: "Introduction to the structure and function of cells.",
    hasAttachment: false,
    attachmentLink: "",
    deadline: "2024-11-25",
  },
  {
    courseCode: "HIST606",
    courseTitle: "World History",
    courseDescription: "A comprehensive overview of world history.",
    hasAttachment: true,
    attachmentLink: "https://example.com/attachments/hist606_overview.pdf",
    deadline: "2024-11-30",
  },
];

// Sample assignment data
const assignments = [
  {
    courseCode: "CS101",
    courseTitle: "Introduction to Computer Science",
    courseDescription: "This course covers the basics of computer science, including programming, algorithms, and data structures.",
    hasAttachment: true,
    attachmentLink: "https://example.com/assignment1.pdf",
    deadline: "2024-12-01",
  },
  {
    courseCode: "CS102",
    courseTitle: "Data Structures",
    courseDescription: "An in-depth course on data structures and their applications.",
    hasAttachment: false,
    deadline: "2024-11-15",
  },
  // Add more assignments as needed
];

export default function AssignmentPage() {
  const { toast } = useToast();
  const [newAssignment, setNewAssignment] = useState({
    courseCode: "",
    courseTitle: "",
    courseDescription: "",
    deadline: "",
    attachmentLink: "",
  });

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: { target: { files: any; }; }) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setNewAssignment((prev) => ({ ...prev, attachmentLink: URL.createObjectURL(file) }));
    }
  };

  const handleSaveAssignment = () => {
    toast({
      title: "Assignment Created",
      description: `Successfully created assignment for course ${newAssignment.courseTitle}. Deadline: ${newAssignment.deadline}`,
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    console.log("New Assignment:", newAssignment);
  };

  return (
    <ContentLayout title="Assignments">
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
            <BreadcrumbPage>Submitted Assignments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlaceholderContent >
        {/* Render different views based on the user role */}
         
        {/* {userRole === "student" && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {dummyAssignments.map((assignment, index) => (
      <AssignmentCard 
        key={index} 
        courseCode={assignment.courseCode}
        courseTitle={assignment.courseTitle}
        courseDescription={assignment.courseDescription}
        hasAttachment={assignment.hasAttachment}
        attachmentLink={assignment.attachmentLink}
        deadline={assignment.deadline}
      />
    ))}
  </div>
)} */}

        {userRole === "teacher" && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Assignments List</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Create Assignment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Assignment</DialogTitle>
                    <DialogDescription>
                      Enter the assignment details below. Click "Save" when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseCode" className="text-right">
                        Course Code
                      </Label>
                      <Input
                        id="courseCode"
                        value={newAssignment.courseCode}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseTitle" className="text-right">
                        Course Title
                      </Label>
                      <Input
                        id="courseTitle"
                        value={newAssignment.courseTitle}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="courseDescription" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="courseDescription"
                        value={newAssignment.courseDescription}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="deadline" className="text-right">
                        Deadline
                      </Label>
                      <Input
                        type="date"
                        id="deadline"
                        value={newAssignment.deadline}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attachment" className="text-right">
                        Attachment
                      </Label>
                      <Input
                        type="file"
                        id="attachment"
                        onChange={handleFileChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveAssignment}>
                      Save Assignment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {assignments.map((assignment, index) => (
                <TeacherAssignmentCard
                  key={index}
                  courseCode={assignment.courseCode}
                  courseTitle={assignment.courseTitle}
                  courseDescription={assignment.courseDescription}
                  hasAttachment={assignment.hasAttachment}
                  attachmentLink={assignment.attachmentLink}
                  deadline={assignment.deadline}
                />
              ))}
            </div>
          </div>
        )}
      </PlaceholderContent>
    </ContentLayout>
  );
}
