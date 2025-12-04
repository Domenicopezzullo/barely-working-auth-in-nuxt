import { z } from "zod";
import { db } from "../../database/db";
import * as table from "../../database/schema";

const bodySchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(
    event,
    bodySchema.parse
  );
  const hashedPassword = await hashPassword(password);
  try {
    await db
      .insert(table.usersTable)
      .values([{ password_hash: hashedPassword, username }]);
  } catch (e) {
    throw createError({
      statusCode: 301,
    });
  }
  await sendRedirect(event, "/login");
  return {};
});
