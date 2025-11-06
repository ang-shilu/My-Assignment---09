import sql from "@/app/api/utils/sql";

// Get all toys with optional filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;

    let query = "SELECT * FROM toys WHERE 1=1";
    const values = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (LOWER(toy_name) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`;
      values.push(`%${search}%`);
    }

    if (category) {
      paramCount++;
      query += ` AND LOWER(sub_category) = LOWER($${paramCount})`;
      values.push(category);
    }

    query += ` ORDER BY rating DESC, created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(limit, offset);

    const toys = await sql(query, values);
    return Response.json({ toys });
  } catch (error) {
    console.error("Error fetching toys:", error);
    return Response.json({ error: "Failed to fetch toys" }, { status: 500 });
  }
}

// Create a new toy
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      toy_name,
      seller_name,
      seller_email,
      price,
      rating = 0,
      available_quantity,
      description,
      picture_url,
      sub_category,
    } = body;

    if (
      !toy_name ||
      !seller_name ||
      !seller_email ||
      !price ||
      !available_quantity
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO toys (toy_name, seller_name, seller_email, price, rating, available_quantity, description, picture_url, sub_category)
      VALUES (${toy_name}, ${seller_name}, ${seller_email}, ${price}, ${rating}, ${available_quantity}, ${description}, ${picture_url}, ${sub_category})
      RETURNING *
    `;

    return Response.json({ toy: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating toy:", error);
    return Response.json({ error: "Failed to create toy" }, { status: 500 });
  }
}
