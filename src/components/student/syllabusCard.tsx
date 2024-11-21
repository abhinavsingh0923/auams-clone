// components/student/SyllabusCard.tsx
import React from "react";

interface SyllabusCardProps {
  courseName: string;
  courseCode: string;
  syllabus: string[];
  referenceBooks: string[];
}

const SyllabusCard: React.FC<SyllabusCardProps> = ({
  courseName,
  courseCode,
  syllabus,
  referenceBooks,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold">{courseName}</h3>
      <p className="text-gray-600 mb-4">{courseCode}</p>
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Syllabus:</h4>
        <ul className="list-disc ml-5">
          {syllabus.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Reference Books:</h4>
        <ul className="list-disc ml-5">
          {referenceBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SyllabusCard;
