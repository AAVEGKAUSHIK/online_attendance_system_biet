import { z } from "zod";

// Define validation schema
export const CreateEmployeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(15),
  gender: z.enum(["male", "female", "other"]),
  departmentId: z.number().int().positive(),
  // designation: z.enum(["professor", "assistantProfessor"]),
  qualification: z.string().min(2),
  dateOfBirth: z.coerce.date(),
  dateOfJoining: z.coerce.date(),
  aadharNumber: z.string().length(12),
  permanentAddress: z.string().min(5),
  // password: z.string().min(6),
});
