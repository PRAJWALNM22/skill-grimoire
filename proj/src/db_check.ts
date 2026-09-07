import { prisma } from './lib/prisma';

async function main() {
  const courses = await prisma.course.findMany();
  console.log("Courses:", courses.map(c => ({ title: c.title, targetClass: c.targetClass, id: c.id })));
  const students = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  console.log("Students:", students.map(s => ({ email: s.email, studentClass: s.studentClass })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
