import prisma from '../config/db';

interface EnrollmentGroupByResult {
  courseId: number;
  _count: {
    id: number;
  };
}

interface ReviewGroupByResult {
  courseId: number;
  _count: {
    id: number;
  };
}

interface MonthlyGrowth {
  month: number; // 1-12
  year: number;
  studentCount: number;
}

export const getOverviewStats = async () => {
  const [
    teacherStats,
    activeTeacherStats,
    studentStats,
    activeStudentStats,
    totalRevenue,
    currentMonthRevenue,
    totalCourses,
    avgCourseRating,
    totalEnrollments,
  ] = await Promise.all([
    // Total teachers
    prisma.user.count({
      where: { roleId: 2 },
    }),
    // Active teachers
    prisma.user.count({
      where: { roleId: 2, active: true },
    }),
    // Total students
    prisma.user.count({
      where: { roleId: 3 },
    }),
    // Active students
    prisma.user.count({
      where: { roleId: 3, active: true },
    }),
    // Total revenue (all payments)
    prisma.payment.aggregate({
      _sum: { amount: true },
    }),
    // Total revenue for current month
    prisma.payment.aggregate({
      where: {
        paidAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(),
        },
      },
      _sum: { amount: true },
    }),
    // Total courses
    prisma.course.count(),
    // Average course rating
    prisma.review.aggregate({
      _avg: { rating: true },
    }),
    // Total enrollments
    prisma.enrollment.count(),
  ]);

  return {
    teachers: teacherStats,
    active_teachers: activeTeacherStats,
    inactive_teachers: teacherStats - activeTeacherStats,
    students: studentStats,
    active_students: activeStudentStats,
    inactive_students: studentStats - activeStudentStats,
    total_revenue: totalRevenue._sum?.amount ?? 0,
    total_revenue_current_month: currentMonthRevenue._sum?.amount ?? 0,
    total_courses: totalCourses,
    avg_course_rating: avgCourseRating._avg?.rating ? Number(avgCourseRating._avg.rating.toFixed(1)) : 0,
    total_enrollments: totalEnrollments,
  };
};

export const getTopCourses = async () => {
  const [mostPopular, topRated] = await Promise.all([
    // Top 5 courses by enrollments (most popular)
    prisma.enrollment.groupBy({
      by: ['courseId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }).then(async (results: EnrollmentGroupByResult[]) => {
      const courseIds = results.map((r) => r.courseId);
      const courses = await prisma.course.findMany({
        where: { id: { in: courseIds } },
        select: { id: true, title: true },
      });
      return results.map((result) => ({
        id: result.courseId,
        title: courses.find((c: any) => c.id === result.courseId)?.title || 'Unknown',
        enrollment_count: result._count.id,
      }));
    }),
    // Top 5 courses by review count (top rated)
    prisma.review.groupBy({
      by: ['courseId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }).then(async (results: ReviewGroupByResult[]) => {
      const courseIds = results.map((r) => r.courseId);
      const courses = await prisma.course.findMany({
        where: { id: { in: courseIds } },
        select: { id: true, title: true },
      });
      return results.map((result) => ({
        id: result.courseId,
        title: courses.find((c: any) => c.id === result.courseId)?.title || 'Unknown',
        review_count: result._count.id,
      }));
    }),
  ]);

  return {
    courses: {
      most_popular: mostPopular,
      top_rated: topRated,
    },
  };
};

export const getUserGrowthStats = async (): Promise<{ growth: MonthlyGrowth[] }> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const startOfYear = new Date(currentYear, 0, 1);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      enrolledAt: {
        gte: startOfYear,
        lte: currentDate,
      },
    },
    select: {
      enrolledAt: true,
    },
  });

  const growthData: MonthlyGrowth[] = Array.from({ length: currentMonth }, (_, i) => ({
    month: i + 1,
    year: currentYear,
    studentCount: 0,
  }));

  enrollments.forEach((enrollment) => {
    const month = enrollment.enrolledAt.getMonth();
    growthData[month].studentCount += 1;
  });

  return { growth: growthData };
};