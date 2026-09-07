import { prisma } from "../src/lib/prisma";
import { verifyPassword, signJwt } from "../src/lib/auth";

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "prajwalnm22@gmail.com" },
    });
    console.log("User:", user?.email);
    
    if (user) {
      const match = await verifyPassword("prajwal__igjt", user.passwordHash);
      console.log("Password match:", match);
      
      const token = await signJwt({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });
      console.log("Token:", token.substring(0, 20) + "...");
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}
test();
