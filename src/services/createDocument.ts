import { SaveOptions } from "mongoose";
import { User, UserTypes } from "../models/User";

export interface CreateDocument {
  (data: Record<string, any>, options?: SaveOptions): Promise<UserTypes>;
}

/**
 * Creates a new document in a Mongoose collection based on the provided model and data.
 *
 * @param Model The Mongoose model type representing the collection.
 * @param data An object containing the data for the new document. Keys should match the model's schema properties.
 * @param options [Optional] Additional Mongoose save options.
 * @returns Promise resolving to the created document. Rejects on errors.
 */
export async function createDocument(data: Record<string, any>, options?: SaveOptions): Promise<UserTypes> {
  try {
    const document = new User(data);
    await document.save(options);
    return document;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Mongoose error: ${error.message}`);
      // Handle specific Mongoose errors here
    } else {
      console.error(`Unexpected error: ${error}`);
    }
    throw error;
  }
}
