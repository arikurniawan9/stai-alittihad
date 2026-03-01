import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const adminExists = await prisma.user.findUnique({
    where: { username: "admin" }
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.create({
      data: {
        name: "Main Admin",
        username: "admin",
        email: "admin@stai-alittihad.ac.id",
        password: hashedPassword,
        role: "ADMIN",
      }
    });
    console.log("Admin account created successfully!");
  }

  redirect("/login?message=setup_complete");
}
