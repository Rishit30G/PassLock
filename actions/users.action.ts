"use server";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import bcrypt from "bcryptjs";
import { updateDetails } from "./password.action";

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

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { databases, account } = await createAdminClient();
    const newUser = await account.create(
      ID.unique(),
      data.email,
      data.password
    );

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newUser.$id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      }
    );
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

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
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

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();
    const result = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );
    if (user.total <= 0) return null;
    return parseStringify(user.documents[0]);
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    throw new Error("Failed to sign out");
  } finally {
    redirect("/sign-in");
  }
};

export const recoveryPassword = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    await account.createRecovery(email, "http://localhost:3000/reset-password");
  } catch (error) {
    throw new Error("Sorry, we don't have an account with that email address");
  }
};

export const getDocumentIdfromUserId = async (userId: string) => {
  const { databases } = await createAdminClient();
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", userId)]
    );
    if (result.total <= 0) return null;
    return result.documents[0].$id;
  } catch (error) {
    throw new Error(error.message || "Failed to get document id");
  }
};

export const updateUserPassword = async (userId: string, password: string) => {
  const { databases } = await createAdminClient();
  const documentId = await getDocumentIdfromUserId(userId);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      documentId,
      { password: hashedPassword }
    );
  } catch (error) {
    throw new Error(error.message || "Failed to update password");
  }
};

export const resetPassword = async (
  userId: string,
  secret: string,
  password: string
) => {
  const { account } = await createAdminClient();
  try {
    await account.updateRecovery(userId, secret, password);
  } catch (error) {
    throw new Error(error.message || "Failed to reset password");
  }
};
