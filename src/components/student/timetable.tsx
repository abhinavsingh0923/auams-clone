"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area"; // Assuming ScrollArea is used for overflow handling

type TimetableData = {
  [day: string]: string[];
};

const Timetable = () => {
  const timetableData: TimetableData = {
    Monday: ["Math", "Science", "History", "Lunch Break", "Geography", "Art"],
    Tuesday: ["English", "Geography", "PE", "Lunch Break", "Math", "Music"],
    Wednesday: ["Math", "Science", "Art", "Lunch Break", "Geography", "Music"],
    Thursday: ["History", "English", "Math", "Lunch Break", "Geography", "PE"],
    Friday: ["Geography", "PE", "Math", "Lunch Break", "Science", "English"],
    Saturday: ["Art", "Math", "Science", "Lunch Break", "English", "PE"],
  };

  const timeSlots: string[] = [
    "9-10 AM",
    "10-11 AM",
    "11-12 PM",
    "12-1 PM",
    "1-2 PM", // Lunch Break
    "2-3 PM",
    "3-4 PM",
    "4-5 PM",
  ];

  return (
    <div className="w-full max-w-full overflow-hidden rounded-md border dark:border-gray-700">
      <ScrollArea className="max-h-screen">
        <table className="w-full text-center border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-2 py-2 text-gray-900 dark:text-gray-100">
                Day
              </th>
              {timeSlots.map((time, index) => (
                <th
                  key={index}
                  className="border border-gray-300 dark:border-gray-700 px-2 py-2 text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetableData).map(([day, subjects], dayIndex) => (
              <tr
                key={dayIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border border-gray-300 dark:border-gray-700 px-2 py-2 font-bold text-gray-900 dark:text-gray-100">
                  {day}
                </td>
                {subjects.map((subject, timeIndex) => (
                  <td
                    key={timeIndex}
                    className={`border border-gray-300 dark:border-gray-700 px-2 py-2 ${
                      subject === "Lunch Break"
                        ? "bg-yellow-200 dark:bg-yellow-500"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {subject}
                  </td>
                ))}
                {subjects.length < timeSlots.length &&
                  Array.from({
                    length: timeSlots.length - subjects.length,
                  }).map((_, idx) => (
                    <td
                      key={idx + subjects.length}
                      className="border border-gray-300 dark:border-gray-700 px-2 py-2 text-gray-900 dark:text-gray-100"
                    >
                      -
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Timetable;
