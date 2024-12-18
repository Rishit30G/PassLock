"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { decrypt, encrypt, parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";
import { getCurrentUser } from "./users.action";

export async function createDetails(
  data: any,
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
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
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
        Query.orderDesc("$createdAt"), // Assuming you want to order by creation date
        Query.limit(9), // Assuming you want to limit the number of documents fetched
        Query.offset(length.length),
      ]
    );

    const result = details.documents.map((doc: any) => ({
      ...doc,
      password: decrypt(doc.password),
    }));

    return parseStringify({ result });
  } catch (error: any) {
    throw new Error(error?.message || "Details not fetched");
  }
}

export async function updateDetails(documentId: string, data: any) {
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
  } catch (error: any) {
    throw new Error(error?.message || "Details not updated");
  }
}

export async function deleteDetails(documentId: any) {
  const { databases } = await createAdminClient();
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.passwordsCollectionId,
      documentId
    );
    return parseStringify({ message: "Details deleted successfully" });
  } catch (error: any) {
    throw new Error(error?.message || "Details not deleted");
  }
}
