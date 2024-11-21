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
import NotesCard from "@/components/student/notescard";

// Dummy data for notes
const dummyNotesData = [
  {
    topic: "Introduction to Signals",
    subTopics: ["Definition", "Types of Signals", "Applications"],
    fileLink: "/files/introduction-signals.pdf",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    topic: "Signal Processing",
    subTopics: ["Filtering", "Fourier Transform", "Sampling"],
    fileLink: "/files/signal-processing.pdf",
  },
  {
    topic: "Analog vs Digital Signals",
    subTopics: ["Characteristics", "Comparison", "Conversion Methods"],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    topic: "Modulation Techniques",
    subTopics: ["AM", "FM", "PM"],
    fileLink: "/files/modulation-techniques.pdf",
  },
  {
    topic: "Digital Transmission",
    subTopics: ["Data Encoding", "Error Detection"],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    topic: "Wireless Communication",
    subTopics: ["Frequencies", "Protocols", "Standards"],
    fileLink: "/files/wireless-communication.pdf",
  },
  {
    topic: "Network Security Basics",
    subTopics: ["Encryption", "Decryption", "Network Attacks"],
  },
  {
    topic: "Emerging Technologies in Communication",
    subTopics: ["5G", "IoT", "Satellite Communication"],
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export default function NotesPage() {
  const params = useParams();
  const courseCode = params.courseCode; // Get the dynamic course code from URL

  return (
    <ContentLayout title={`Notes for ${courseCode}`}>
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
          <BreadcrumbPage>{courseCode} Notes</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
        <h2 className="text-xl font-semibold mb-4">Course Notes for {courseCode}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dummyNotesData.map((note, index) => (
            <NotesCard
              key={index}
              topic={note.topic}
              subTopics={note.subTopics}
              fileLink={note.fileLink}
              youtubeLink={note.youtubeLink}
            />
          ))}
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
