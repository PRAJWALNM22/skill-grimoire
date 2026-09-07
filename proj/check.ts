import { prisma } from './src/lib/prisma';
prisma.lesson.findMany({where: {pptUrl: {not: null}}}).then(console.log).finally(() => prisma.$disconnect());
