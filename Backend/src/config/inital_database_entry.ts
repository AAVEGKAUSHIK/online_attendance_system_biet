import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const departments = [
    {
      name: "Computer Science",
      abbrev: "CS",
    },
    {
      name: "Information Technology",
      abbrev: "IT",
    },
    {
      name: "Electronics and Communication Engineering",
      abbrev: "ECE",
    },
    {
      name: "Electrical Engineering",
      abbrev: "EE",
    },
    {
      name: "Mechanical Engineering",
      abbrev: "ME",
    },
    {
      name: "Civil Engineering",
      abbrev: "CE",
    },
    {
      name: "Chemical  Engineering",
      abbrev: "CHE",
    },
  ];
  for (const department of departments) {
    await prisma.department.create({
      data: department,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
