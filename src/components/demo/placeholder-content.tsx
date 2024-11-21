import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import AssignmentCard from "../student/assignmentCard";

import { ReactNode } from "react";

interface PlaceholderContentProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PlaceholderContent({
  children,
  className = "",
  containerClassName = "",
}: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className={`flex items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] ${containerClassName}`}>
          <div className={className}>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
