import { v4 as uuidv4 } from "uuid";

export function generateUUID(): string {
  const random_uuid = uuidv4();

  return random_uuid;
}
