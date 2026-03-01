import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // 1. Create ADMIN
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@stai-alittihad.ac.id',
      password: password,
      name: 'Super Admin Siakad',
      role: 'ADMIN',
    },
  });

  // 2. Create TEACHER (Dosen)
  const teacher = await prisma.user.upsert({
    where: { username: 'dosen' },
    update: {},
    create: {
      username: 'dosen',
      email: 'dosen@stai-alittihad.ac.id',
      password: password,
      name: 'Dr. Ahmad Dosen, M.Pd',
      role: 'TEACHER',
    },
  });

  // 3. Create STUDENT (Mahasiswa)
  const student = await prisma.user.upsert({
    where: { username: 'mahasiswa' },
    update: {},
    create: {
      username: 'mahasiswa',
      email: 'mahasiswa@stai-alittihad.ac.id',
      password: password,
      name: 'Budi Santoso (Mahasiswa)',
      role: 'STUDENT',
    },
  });

  // 4. Create COURSE (Mata Kuliah)
  const course = await prisma.course.create({
    data: {
      title: 'Ekonomi Syariah Dasar',
      teacherId: teacher.id,
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Hukum Perdata Islam',
      teacherId: teacher.id,
    }
  });

  // 5. Create SESSION (Jadwal Jitsi)
  await prisma.session.create({
    data: {
      courseId: course.id,
      jitsiRoomId: 'ekonomi-syariah-101',
      startTime: new Date(),
    }
  });

  await prisma.session.create({
    data: {
      courseId: course2.id,
      jitsiRoomId: 'hukum-perdata-202',
      startTime: new Date(Date.now() + 86400000), // Besok
    }
  });

  console.log('Seed data updated with Courses and Jitsi Sessions!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
