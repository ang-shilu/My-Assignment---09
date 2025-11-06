import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const rows =
      await sql`SELECT id, name, email, image FROM auth_users WHERE id = ${userId} LIMIT 1`;
    const user = rows?.[0] || null;

    return Response.json({ user });
  } catch (err) {
    console.error("GET /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, image } = body || {};

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (typeof name === "string" && name.trim().length > 0) {
      paramCount++;
      setClauses.push(`name = $${paramCount}`);
      values.push(name.trim());
    }

    if (typeof image === "string") {
      paramCount++;
      setClauses.push(`image = $${paramCount}`);
      values.push(image.trim() || null);
    }

    if (setClauses.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    const query = `UPDATE auth_users SET ${setClauses.join(", ")} WHERE id = $${paramCount + 1} RETURNING id, name, email, image`;
    values.push(userId);

    const result = await sql(query, values);
    const updated = result?.[0] || null;

    return Response.json({ user: updated });
  } catch (err) {
    console.error("PUT /api/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
