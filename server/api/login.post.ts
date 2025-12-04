import { z } from "zod";
import { db } from "../../database/db";
import { eq } from "drizzle-orm";
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
  console.log(username, password);

  const user = await db
    .select()
    .from(table.usersTable)
    .where(eq(table.usersTable.username, username))
    .limit(1);
  const existingUser = user.at(0);
  console.log(existingUser);
  if (!existingUser) {
    throw createError({ statusCode: 301 });
  }

  const passwordMatches = await verifyPassword(
    existingUser.password_hash,
    password
  );
  if (!passwordMatches) {
    throw createError({ statusCode: 301 });
  } else {
    const ClientUser = {
      id: existingUser.id,
      username: existingUser.username,
    };

    await setUserSession(event, {
      user: ClientUser,
    });
    return { success: true };
  }
});
