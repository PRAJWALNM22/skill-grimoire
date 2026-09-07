import { prisma } from "./prisma";
import { hashPassword } from "./auth";

export async function seedDatabase() {
  try {
    // Seed admin users if not present
    const adminAccounts = [
      { name: "Admin", email: "admin@skillgrimoire.com", username: "admin" },
      { name: "Founder", email: "founder@skillgrimoire.com", username: "founder" },
      { name: "CEO", email: "ceo@skillgrimoire.com", username: "ceo" },
      { name: "Prajwal N M", email: "prajwalnm22@gmail.com", username: "prajwalnm22" },
    ];
    const adminHash = await hashPassword("Admin@1234");
    for (const adm of adminAccounts) {
      const existing = await prisma.user.findUnique({ where: { email: adm.email } });
      if (!existing) {
        await prisma.user.create({
          data: {
            name: adm.name,
            email: adm.email,
            username: adm.username,
            passwordHash: adminHash,
            emailVerified: true,
            mustChangePassword: false,
            role: "ADMIN",
          },
        });
      }
    }

    const existingStudent = await prisma.user.findFirst({ where: { role: "STUDENT" } });
    if (existingStudent) {
      return { message: "Database already seeded" };
    }

    // 1. Create Domains
    const financeDomain = await prisma.domain.upsert({
      where: { slug: "finance" },
      update: {},
      create: {
        name: "Finance",
        slug: "finance",
        description: "AI-powered financial modelling, risk analytics and algorithmic intelligence",
        icon: "TrendingUp",
      },
    });

    const marketingDomain = await prisma.domain.upsert({
      where: { slug: "marketing" },
      update: {},
      create: {
        name: "Marketing",
        slug: "marketing",
        description: "Data-driven growth strategies, AI copywriting and consumer intelligence",
        icon: "Target",
      },
    });

    const hrDomain = await prisma.domain.upsert({
      where: { slug: "hr" },
      update: {},
      create: {
        name: "HR",
        slug: "hr",
        description: "AI-powered talent acquisition, performance intelligence and people analytics",
        icon: "Users",
      },
    });

    const aiToolsDomain = await prisma.domain.upsert({
      where: { slug: "ai-tools" },
      update: {},
      create: {
        name: "AI Tools",
        slug: "ai-tools",
        description: "Prompt engineering, LLM automation, agentic workflows and computer vision",
        icon: "Cpu",
      },
    });

    // 2. Create Courses
    const courseFinance = await prisma.course.create({
      data: {
        title: "AI in Finance",
        slug: "ai-in-finance",
        subtitle: "Smarter financial decisions",
        description: "Master AI applications in financial forecasting, algorithmic risk calculation, and automated analytics.",
        domainId: financeDomain.id,
        level: "All Levels",
        durationHours: 24,
        totalLessons: 12,
        rating: 4.95,
        enrolledCount: 3420,
        featured: true,
        badge: "Bestseller",
        targetClass: "College",
      },
    });

    const courseMarketing = await prisma.course.create({
      data: {
        title: "AI in Marketing",
        slug: "ai-in-marketing",
        subtitle: "Data-driven AI strategies",
        description: "Leverage predictive models, generative AI creative pipelines, and autonomous marketing campaigns.",
        domainId: marketingDomain.id,
        level: "All Levels",
        durationHours: 20,
        totalLessons: 10,
        rating: 4.9,
        enrolledCount: 2890,
        featured: true,
        badge: "Trending",
        targetClass: "PU",
      },
    });

    const courseHR = await prisma.course.create({
      data: {
        title: "AI in HR",
        slug: "ai-in-hr",
        subtitle: "AI-powered people strategies",
        description: "Transform human resource management through AI sentiment tracking, talent discovery, and automated ops.",
        domainId: hrDomain.id,
        level: "All Levels",
        durationHours: 18,
        totalLessons: 8,
        rating: 4.88,
        enrolledCount: 2150,
        featured: true,
        badge: "High Demand",
        targetClass: "10th",
      },
    });

    // 3. Create Demo Student User
    const user = await prisma.user.create({
      data: {
        name: "Arjun Sharma",
        email: "arjun.sharma@example.com",
        username: "arjun_sharma",
        // bcrypt hash of "password123" — demo only, change in production
        passwordHash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeAa/N2jPNRJkzqKu",
        emailVerified: true,
        role: "STUDENT",
        bio: "Future AI Architect & Quantitative Strategist",
      },
    });


    // 4. Enrollments with progress
    await prisma.enrollment.createMany({
      data: [
        {
          userId: user.id,
          courseId: courseFinance.id,
          progressPercent: 75,
          completedLessons: 9,
          status: "IN_PROGRESS",
        },
        {
          userId: user.id,
          courseId: courseMarketing.id,
          progressPercent: 68,
          completedLessons: 7,
          status: "IN_PROGRESS",
        },
        {
          userId: user.id,
          courseId: courseHR.id,
          progressPercent: 82,
          completedLessons: 7,
          status: "IN_PROGRESS",
        },
      ],
    });

    // 5. Certificate
    await prisma.certificate.create({
      data: {
        userId: user.id,
        title: "Certificate of Achievement",
        courseName: "AI in Finance",
        certificateNo: "SG-FIN-2025-8849",
        badgeType: "ADVANCED CERTIFICATION",
      },
    });

    // 6. Scholarship
    await prisma.scholarship.create({
      data: {
        userId: user.id,
        title: "Top Performer Merit Scholarship",
        awardedFor: "Outstanding academic performance & 85% skill mastery in AI Foundations",
        amount: 25000,
        badgeTier: "GOLD",
      },
    });

    return { message: "Database seeded successfully" };
  } catch (error) {
    console.error("Seeding error:", error);
    return { error: String(error) };
  }
}
