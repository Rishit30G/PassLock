import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { toast } from "sonner";

const ENCRYPTION_KEY = Buffer.from('01234567890123456789012345678901', "utf8");
const IV_LENGTH = 16; // Initialization vector length for AES

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

// Encrypt function
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // Return IV + Encrypted text
}

// Decrypt function
export function decrypt(encryptedText: string): string {
  const [iv, encrypted] = encryptedText.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted; // Return original text
}

export const maskPassword = (password: string) => {
  return '*'.repeat(password.length);
};

export const generateCircles = (length: number) => {
  return '●'.repeat(length);
};

export const handleCopy = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
    toast.success("Password copied!");
  } catch {
    toast.error("Failed to copy password");
  }
};

export const sortByOrgName = (array: {orgName: string}[]) => {
  return array.sort((a, b) => {
    if (a.orgName < b.orgName) {
      return -1;
    }
    if (a.orgName > b.orgName) {
      return 1;
    }
    return 0;
  })
}