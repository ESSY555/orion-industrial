import type { Course, CourseAssignment, CourseWithCourseAssignment } from "./useLMS";

export const mockCourse: Course = {
  _id: "course-chem-001",
  title: "Chemical Handling SK-148",
  description: "Proper procedures and safety for handling SK-148 chemicals.",
  thumbnailUrl: "https://example.com/thumbs/sk-148.png",
  minimumPassScore: 70,
  files: [
    { type: "document", url: "https://example.com/docs/sk-148-sds.pdf" },
    { type: "video", url: "https://example.com/video/sk-148-intro.mp4" },
  ],
  questionsAndOptions: [
    {
      question:
        "When using SK-148 for heavy soil cleaning, which PPE is required?",
      options: ["Safety goggles", "Sandals", "No gloves", "Loose clothing"],
    },
    {
      question: "Recommended dilution ratio for general cleaning with SK-148?",
      options: ["1:64", "1:128", "1:32", "1:8"],
    },
    {
      question: "Which step should be performed BEFORE applying SK-148?",
      options: ["Don PPE", "Turn off ventilation", "Dilute with oil", "Smoke nearby"],
    },
    {
      question: "Select the correct storage guideline for SK-148:",
      options: [
        "Store near heat",
        "Keep sealed and labeled",
        "Expose to sunlight",
        "Mix with acids",
      ],
    },
  ],
  answers: [["Safety goggles"], ["1:128"], ["Don PPE"], ["Keep sealed and labeled"]],
  assessmentDuration: 10,
  facilityId: "facility-001",
};

export const mockAssignment: CourseAssignment = {
  userId: "user-001",
  courseId: mockCourse._id,
  expiresAt: "open",
  completed: false,
  score: 0,
  attempts: 0,
  maxAttempts: 100,
};

export const mockCourseWithAssignment: CourseWithCourseAssignment = {
  ...mockCourse,
  courseAssignment: mockAssignment,
};


