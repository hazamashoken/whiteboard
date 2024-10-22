import { getAllCoursesAdmin } from "@/lib/edu/courses";
import AdminDashboard from "./component";
import { getAllProfile } from "@/lib/edu/profile";

export default async function AdminPage() {
  const { data: courseData, error: courseError } = await getAllCoursesAdmin();
  const { data: userData, error: userError } = await getAllProfile();
  return (
    <AdminDashboard
      courseData={JSON.parse(JSON.stringify(courseData))}
      userData={JSON.parse(JSON.stringify(userData))}
    ></AdminDashboard>
  );
}
