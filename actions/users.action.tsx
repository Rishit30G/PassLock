"use server";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    throw new Error("Failed to send OTP");
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/dashboard",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    throw new Error("Failed to verify OTP");
  }
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", email)]
  );
  return result.total > 0 ? result.documents[0] : null;
};

export const createAccount = async (
  data: any
): Promise<{ message: string }> => {
  try {
    const userEmail = data.email;

    const existingUser = await getUserByEmail(userEmail);
    if (existingUser) {
      throw new Error("User already exists");
    }

    if (!existingUser) {
      const { databases } = await createAdminClient();
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          accountId: ID.unique(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
      );
    }
    revalidatePath("/dashboard");
    return parseStringify({ message: "Account created successfully" });
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

export const getAccount = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const isPasswordValid = existingUser.password === password;
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accountId = await sendEmailOTP(email);
    if (!accountId) {
      throw new Error("Failed to send OTP");
    }

    return { message: "OTP sent successfully", accountId: accountId };
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};
