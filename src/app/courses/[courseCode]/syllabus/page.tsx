// app/courses/[courseCode]/syllabus/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

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
import SyllabusCard from "@/components/student/syllabusCard";

export default function SyllabusPage() {
  const params = useParams();
  const courseCode = Array.isArray(params.courseCode) ? params.courseCode[0] : params.courseCode; // Ensure courseCode is a string

  // Placeholder data for syllabus and reference books
  const courseName = "Introduction to Communication Systems";
  const syllabus = [
    "Signal Processing Basics",
    "Analog and Digital Modulation",
    "Noise in Communication Systems",
    "Wireless Communication Technologies",
  ];
  const referenceBooks = [
    "Communication Systems by Simon Haykin",
    "Digital Communication by John G. Proakis",
    "Principles of Communication Systems by Herbert Taub and Donald L. Schilling",
  ];

  return (
    <ContentLayout title={`Syllabus for ${courseCode}`}>
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
            <BreadcrumbLink asChild>
              <Link href="/courses">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>{courseCode} Syllabus</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <h2 className="text-xl font-semibold mb-4">Course Syllabus for {courseCode}</h2>
        <SyllabusCard
          courseName={courseName}
          courseCode={courseCode}
          syllabus={syllabus}
          referenceBooks={referenceBooks}
        />
      </PlaceholderContent>
    </ContentLayout>
  );
}
