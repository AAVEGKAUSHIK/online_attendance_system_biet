import crypto from "crypto";

export function generatePassword() {
  return crypto.randomBytes(12).toString("hex");
}
