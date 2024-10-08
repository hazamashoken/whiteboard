"use server";

import { Assignment, AssignmentDocument } from "@/models/Assignments";
import { Course } from "@/models/Courses";

export type AssignmentPayload = Omit<
  AssignmentDocument,
  "_id" | "createdAt" | "updatedAt" | "course" | "active"
>;

// getAssignmentsByCourse
// getAssignment
// getAllAssignment
// addAssignmentToCourse
// removeAssignment

export async function getAssignmentsByCourse(courseId: string, active = true) {
  const assignments = await Assignment.find<AssignmentDocument>({
    course: courseId,
    active,
  });

  return {
    error: null,
    data: assignments,
  };
}

export async function getAssignment(assignmentId: string) {
  const assignment = await Assignment.findById<AssignmentDocument>(
    assignmentId
  );

  return {
    error: null,
    data: assignment,
  };
}

export async function getAllAssignment() {
  const assignments = await Assignment.find<AssignmentDocument>();

  return {
    error: null,
    data: assignments,
  };
}

export async function addAssignmentToCourse(
  courseId: string,
  payload: AssignmentPayload
) {
  const data = {
    ...payload,
    course: courseId,
  };

  const assignment = await Assignment.create<AssignmentDocument>(data);

  await Course.findByIdAndUpdate(courseId, {
    $addToSet: {
      assignments: assignment._id,
    },
  });

  return {
    error: null,
    data: assignment,
  };
}

export async function removeAssignment(assignmentId: string) {
  const assignment = await Assignment.findById(assignmentId);

  if (!Assignment) {
    return {
      error: "Assignment not found",
      data: null,
    };
  }

  await Course.findByIdAndUpdate(assignment.course, {
    $pull: {
      assignments: assignmentId,
    },
  });

  await assignment.remove();

  return {
    error: null,
    data: true,
  };
}

export async function toggleAssignment(assignmentId: string) {
  const assignment = await Assignment.findByIdAndUpdate<AssignmentDocument>(
    assignmentId,
    {
      $set: {
        active: false,
      },
    }
  );

  if (!assignment) {
    return {
      error: "Assignment not found",
      data: null,
    };
  }

  return {
    error: null,
    data: assignment,
  };
}
