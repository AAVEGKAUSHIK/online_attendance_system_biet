import express from "express";
import prisma from "../config/prisma";
import { z } from "zod";
import { CreateEmployeeSchema } from "../validations/employee";
import { ApiResponse } from "../helpers/ApiResponse";
import { generatePassword } from "../helpers/functions";

import { hashSync, genSaltSync } from "bcrypt";
import { sendPasswordToEmail } from "../helpers/sendmail";

const router = express.Router();

// Create a new employee ->     /create/headOfDepartment , /create/teacher
router.post("/create/:role", async (req, res): Promise<any> => {
  try {
    //cheking the uniqueness of username, email and phonenumber
    const oldEmployee = await prisma.employee.findFirst({
      where: {
        OR: [
          { username: req.body.username },
          { email: req.body.email },
          { phoneNumber: req.body.phoneNumber },
        ],
      },
    });

    if (oldEmployee) {
      return res
        .status(400)
        .json(
          ApiResponse.error(
            "Username, email or phone number already exists",
            400
          )
        );
    }
    const validatedData = CreateEmployeeSchema.parse(req.body);

    // If validatedData is correct, proceed to create the HOD
    if (!validatedData) {
      return res.status(400).json(ApiResponse.error("Invalid data", 400));
    }

    // put a strong password and send to email
    const password = generatePassword();

    // Send the password to the HOD's email
    sendPasswordToEmail(validatedData.username, validatedData.email, password);

    // Hash the password before storing it in the database
    const hashedPassword = hashSync(password, genSaltSync(10));

    // Create employee with validated data
    if (req.params.role === "teacher") {
      const employee = await prisma.employee.create({
        data: {
          ...validatedData,
          role: "headOfDepartment",
          isVerified: true,
          temporaryAddress: req.body.temporaryAddress || null,
          designation: req.body.designation || null,
          password: hashedPassword,
        },
      });
      return res
        .status(201)
        .json(
          ApiResponse.success(
            employee,
            `Teacher created of username ${validatedData.username}`,
            201
          )
        );
    } else if (req.params.role === "headOfDepartment") {
      const employee = await prisma.employee.create({
        data: {
          ...validatedData,
          role: "teacher",
          isVerified: true,
          temporaryAddress: req.body.temporaryAddress || null,
          designation: req.body.designation || null,
          password: hashedPassword,
        },
      });
      return res
        .status(201)
        .json(
          ApiResponse.success(
            employee,
            `Head of Department created of username ${validatedData.username}`,
            201
          )
        );
    } else {
      return res.status(400).json(ApiResponse.error("Invalid role", 400));
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal server error " });
    console.log(error);
  }
});

export default router;
