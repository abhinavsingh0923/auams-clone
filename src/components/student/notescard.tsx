import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface NotesCardProps {
  topic: string;                   // Main topic of the notes
  subTopics: string[];             // Array of subtopics covered in the notes
  fileLink?: string;               // Link for the file attachment, if available
  youtubeLink?: string;            // Link for the YouTube video, if available
}

const NotesCard: React.FC<NotesCardProps> = ({
  topic,
  subTopics,
  fileLink,
  youtubeLink,
}) => {
  return (
    <Card className="w-25vw">
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
        <CardDescription>
          <h2 className="font-semibold">Subtopics:</h2>
          <ul className="list-disc list-inside ml-4">
            {subTopics.map((subTopic, index) => (
              <li key={index}>{subTopic}</li>
            ))}
          </ul>
        </CardDescription>
      </CardHeader>

      {/* File Preview/Download Section */}
      {fileLink && (
        <CardContent className="flex flex-row items-center space-x-4">
          <Button variant="outline" className="w-40 h-8">
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              Download File
            </a>
          </Button>
          <Button variant="outline" className="w-40 h-8">
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              Preview File
            </a>
          </Button>
        </CardContent>
      )}

      {/* YouTube Video Preview Section */}
      {youtubeLink && (
        <CardContent className="mt-4">
          <iframe
            width="100%"
            height="200"
            src={youtubeLink}
            title="YouTube video preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </CardContent>
      )}

      <CardFooter>
        <Button variant="outline">Add Notes</Button>
      </CardFooter>
    </Card>
  );
};

export default NotesCard;
