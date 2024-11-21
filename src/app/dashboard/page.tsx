"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import PlaceholderContent from "@/components/demo/placeholder-content";
import Timetable from "@/components/student/timetable";
import Attendancetablelist from "@/components/student/attendancetablelist";
import AssignmentCard from "@/components/student/assignmentCard";

export default function DashboardPage() {

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
      courseDescription: "An introduction to data structures and their applications.",
      hasAttachment: false,
      attachmentLink: "",
      deadline: "2024-12-05",
    },
    {
      courseCode: "CS103",
      courseTitle: "Algorithms",
      courseDescription: "Learn about algorithm design and analysis.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment3.pdf",
      deadline: "2024-12-10",
    },
    {
      courseCode: "CS104",
      courseTitle: "Web Development",
      courseDescription: "Explore the fundamentals of web development using HTML, CSS, and JavaScript.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment4.pdf",
      deadline: "2024-12-15",
    },
    {
      courseCode: "CS105",
      courseTitle: "Database Management Systems",
      courseDescription: "Study the concepts of database design and management.",
      hasAttachment: false,
      attachmentLink: "",
      deadline: "2024-12-20",
    },
    {
      courseCode: "CS106",
      courseTitle: "Operating Systems",
      courseDescription: "Understand the principles of operating systems and their design.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment6.pdf",
      deadline: "2024-12-25",
    },
    {
      courseCode: "CS107",
      courseTitle: "Software Engineering",
      courseDescription: "Learn about software development methodologies and project management.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment7.pdf",
      deadline: "2024-12-30",
    },
    {
      courseCode: "CS108",
      courseTitle: "Machine Learning",
      courseDescription: "Introduction to machine learning concepts and applications.",
      hasAttachment: false,
      attachmentLink: "",
      deadline: "2024-12-28",
    },
    {
      courseCode: "CS109",
      courseTitle: "Computer Networks",
      courseDescription: "Study the principles of computer networking and communication protocols.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment9.pdf",
      deadline: "2024-12-22",
    },
    {
      courseCode: "CS110",
      courseTitle: "Cyber Security",
      courseDescription: "Explore the principles of cyber security and risk management.",
      hasAttachment: true,
      attachmentLink: "https://example.com/assignment10.pdf",
      deadline: "2024-12-29",
    },
  ];



  const attendanceData = [
    {
      courseCode: "CS101",
      courseTitle: "Introduction to Computer Science",
      attendance: 85,
      dates: [new Date(2024, 0, 10), new Date(2024, 0, 12)] // Example dates
    },
    { courseCode: "CS102", courseTitle: "Data Structures", attendance: 78, dates: [] },
    { courseCode: "CS103", courseTitle: "Algorithms", attendance: 92, dates: [] },
    { courseCode: "CS104", courseTitle: "Operating Systems", attendance: 65, dates: [] },
    { courseCode: "CS105", courseTitle: "Database Management", attendance: 88, dates: [] },
    {
      courseCode: "CS106",
      courseTitle: "Software Engineering",
      attendance: 55,
      dates: []
    },
    { courseCode: "CS107", courseTitle: "Computer Networks", attendance: 90, dates: [] },
    { courseCode: "CS108", courseTitle: "Web Development", attendance: 80, dates: [] },
    {
      courseCode: "CS109",
      courseTitle: "Mobile App Development",
      attendance: 70,
      dates: []
    },
    { courseCode: "CS110", courseTitle: "Machine Learning", attendance: 95, dates: [] }
  ];
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TooltipProvider>
        <div className="flex gap-6 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-hover-open"
                  onCheckedChange={(x: any) => setSettings({ isHoverOpen: x })}
                  checked={settings.isHoverOpen}
                />
                <Label htmlFor="is-hover-open">Hover Open</Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>When hovering on the sidebar in mini state, it will open</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="disable-sidebar"
                  onCheckedChange={(x: any) => setSettings({ disabled: x })}
                  checked={settings.disabled}
                />
                <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Hide sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <PlaceholderContent className="w-full">
        <h2 className="text-xl text-bold mb-8">TimeTable</h2>
        <Timetable/>
        <h2 className="text-xl mt-8 text-bold mb-5">Attendance Table</h2>
        <Attendancetablelist attendanceData={attendanceData}/>
          <h2 className="text-xl mt-8 text-bold mb-5">Pending Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {assignments.map((assignment, index) => (
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
      </PlaceholderContent>
    </ContentLayout>
  );
}
