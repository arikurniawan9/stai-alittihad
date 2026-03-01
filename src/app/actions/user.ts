"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as any;

  if (!name || !username || !email || !password || !role) {
    throw new Error("Semua field harus diisi!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("Username atau Email sudah terdaftar!");
    }
    throw new Error("Gagal membuat user baru.");
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (err) {
    throw new Error("Gagal menghapus user.");
  }
}
