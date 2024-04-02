import { QueryOptions } from "mongoose";
import { User, UserTypes } from "../models/User";

export interface GetDocument {
  (condition: Record<string, any>, options?: Partial<QueryOptions>): Promise<UserTypes>;
}

/**
 * Fetches a document from a Mongoose collection based on the provided model and conditions.
 *
 * @param Model The Mongoose model type representing the collection.
 * @param condition An object containing query conditions for the document. Keys should match the model's schema properties.
 * @param options [Optional] Additional Mongoose query options such as projections or sort order.
 * @returns Promise resolving to the found document or null if not found. Rejects on errors.
 */

export async function getDocument(
  condition: Record<string, any>,
  options?: Partial<QueryOptions>
): Promise<UserTypes | null | any> {
  try {
    const document = await User.findOne(condition, options).lean().exec();
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
