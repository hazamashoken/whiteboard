import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourseForm from "./_components/course-create-form";
import ProfileForm from "./_components/profile-create-form";
import { AssignProfileCourseForm } from "./_components/assign-profile-course";
import { PROFILE_TYPES } from "@/models";

export default function AdminDashboard(props: {
  courseData: any[];
  userData: any[];
}) {
  const { courseData, userData } = props;

  function convertTypeToRole(type: PROFILE_TYPES) {
    switch (type) {
      case PROFILE_TYPES.ADMIN:
        return "Admin";
      case PROFILE_TYPES.TEACHER:
        return "Teacher";
      case PROFILE_TYPES.STUDENT:
        return "Student";
      default:
        return "Unknown";
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

        <Tabs defaultValue="courses">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Manage Courses</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="assignments">Assign to Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
                <CardDescription>
                  Add a new course to the E-Learning System.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseForm />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Courses</CardTitle>
                <CardDescription>
                  View and manage existing courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseData.map((course: any) => (
                      <TableRow key={course._id}>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Create New User</CardTitle>
                <CardDescription>
                  Add a new user to the E-Learning System.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Existing Users</CardTitle>
                <CardDescription>
                  View and manage existing users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.map((user: any) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{convertTypeToRole(user.type)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Assign Users to Courses</CardTitle>
                <CardDescription>
                  Add students or teachers to specific courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssignProfileCourseForm />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Current Course Assignments</CardTitle>
                <CardDescription>
                  View and manage user assignments to courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData
                      .filter((user) => user.type === PROFILE_TYPES.STUDENT)
                      .map((assignment) =>
                        assignment.courses.map((course: any) => (
                          <TableRow key={assignment._id}>
                            <TableCell>
                              {assignment.firstName} {assignment.lastName}
                            </TableCell>
                            <TableCell>
                              {convertTypeToRole(assignment.type)}
                            </TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
