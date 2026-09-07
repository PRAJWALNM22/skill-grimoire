import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@admin.com';
  const username = 'admin';
  const password = 'password123'; // The password you will use to log in
  const role = 'ADMIN';

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
      passwordHash: passwordHash
    },
    create: {
      email,
      username,
      passwordHash,
      role,
      name: 'System Admin',
      emailVerified: true
    },
  });

  console.log('✅ Admin user successfully created!');
  console.log('Email:', admin.email);
  console.log('Username:', admin.username);
  console.log('Password: password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
