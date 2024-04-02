# validateUniqueness Function

## Description

This function checks the uniqueness of a specified field in the Admin model by querying the database.

## Parameters

- `field`: A string representing the field name to check for uniqueness.
- `value`: A string representing the value to check for uniqueness.

## Throws

- Throws an error if the specified field already exists in the database.

## Usage Example

```typescript
import { validateUniqueness } from "../path/to/your/file";

try {
  await validateUniqueness("email", "example@example.com");
  console.log("Email is unique.");
} catch (error) {
  console.error("Error:", error.message);
}
