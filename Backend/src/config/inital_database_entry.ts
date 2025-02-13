import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create_inital_db_entry() {
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
    if (
      await prisma.department.findUnique({ where: { name: department.name } })
    )
      continue;
    await prisma.department.create({
      data: department,
    });
  }
}
