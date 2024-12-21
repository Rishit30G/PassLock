"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { decrypt, encrypt, parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";
import { getCurrentUser } from "./users.action";

interface UserData {
  orgName: string;
  orgUrl?: string;
  username?: string;
  password: string;
}

export async function createDetails(
  data: UserData,
  userId: string,
  accountId: string
) {
  try {
    const { databases } = await createAdminClient();
    const encryptedPassword = encrypt(data.password);
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      ID.unique(),
      {
        owner: userId,
        accountId,
        orgName: data.orgName,
        password: encryptedPassword,
        orgUrl: data?.orgUrl || null,
        userName: data?.username || null,
      }
    );
    return parseStringify({ message: "Details created successfully" });
  } catch (error) {
    throw new Error((error as Error)?.message || "Something went wrong");
  }
}

export async function getSearchDetails(searchTerm: string) {
  try {
    const { databases } = await createAdminClient();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const orgNameResults = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      [Query.contains("orgName", lowerCaseSearchTerm)]
    );

    const userNameResults = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      [Query.contains("userName", lowerCaseSearchTerm)]
    );

    // Combine results manually
    const combinedResults = [
      ...orgNameResults.documents,
      ...userNameResults.documents,
    ];

    const result = combinedResults.map((doc) => ({
      ...doc,
      password: decrypt(doc.password),
    }));

    if (combinedResults.length > 0) {
      return parseStringify({ result });
    } else {
      return { message: "No matching results found" };
    }
  } catch (error) {
    throw new Error((error as Error)?.message || "Failed to perform search");
  }
}

export async function getDetails(length: { length: number }) {
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const details = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      [
        Query.equal("owner", currentUser.$id),
        Query.orderDesc("$createdAt"),
        Query.limit(9),
        Query.offset(length.length),
      ]
    );

    const result = details.documents.map((doc) => ({
      ...doc,
      password: decrypt(doc.password),
    }));

    return parseStringify({ result });
  } catch (error) {
    throw new Error((error as Error)?.message || "Details not fetched");
  }
}

export async function updateDetails(
  documentId: string,
  data: UserData,
) {
  const { databases } = await createAdminClient();
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      documentId,
      {
        orgName: data.orgName,
        orgUrl: data?.orgUrl || null,
        userName: data?.username || null,
        password: encrypt(data.password),
      }
    );
    return parseStringify({ message: "Details updated successfully" });
  } catch (error) {
    throw new Error((error as Error)?.message || "Details not updated");
  }
}

export async function deleteDetails(documentId: string) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      documentId
    );
    return parseStringify({ message: "Details deleted successfully" });
  } catch (error) {
    throw new Error((error as Error)?.message || "Details not deleted");
  }
}
