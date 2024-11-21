import Link from "next/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Springfield, IL",
  role: "teacher", // options: "student", "teacher", "admin"
  batch: "2021-2025 ",
  phone: "+91 1234567890",
  advisor: "Dr. Jane Smith",
  id: "58243",
  previousSubjects: ["Mathematics", "Physics"],
  currentSubjects: ["Data Structures", "Algorithms"],
  semester: "5th",
  year: "final",
  cgpa: "3.8",
  offeredSubjects: ["Computer Science", "Software Engineering"],
  department: "Computer Science",
  imageUrl: "https://github.com/shadcn.png"
};

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center dark:bg-slate-800 bg-slate-200 p-8 rounded md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
      {/* Left Side: Avatar and Basic Info */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <Avatar className="aspect-square h-52 w-52 max-w-xs">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Basic Info Below Avatar */}
        <div className="text-center item-center ">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">
            Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Right Side: Additional Details */}
      <div className="w-full max-w-md space-y-2">
        {user.role === "student" && (
          <>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Advisor:</strong> {user.advisor}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Phone no:</strong> {user.phone}
            </p>
            <p>
              <strong>Batch:</strong> {user.batch}
            </p>
            <p>
            <strong>Year:</strong> {user.year}
              
            </p>
            <p>
            <strong>Semester:</strong> {user.semester}
            </p>
            <p>
              <strong>CGPA:</strong> {user.cgpa}
            </p>
            <p>
              <strong>Previous Subjects:</strong>{" "}
              {user.previousSubjects.join(", ")}
            </p>
            <p>
              <strong>Current Subjects:</strong>{" "}
              {user.currentSubjects.join(", ")}
            </p>
          </>
        )}

        {user.role === "teacher" && (
            <>
            <p>
            <strong>Deparment:</strong> {user.department}
            </p>
            <p>
            <strong>Address:</strong> {user.address}
            </p>
          <p>
            <strong>Subjects Offered:</strong> {user.offeredSubjects.join(", ")}
          </p>
          </>
        )}

        {user.role === "admin" && (
          <>
            <p>
              <strong>Admin Panel Access:</strong>
            </p>
            <p>Manage Users, Courses, and System Settings</p>
          </>
        )}
      </div>
    </div>
  );
}
