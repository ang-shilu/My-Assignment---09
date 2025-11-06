import sql from "@/app/api/utils/sql";

// Get a single toy by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return Response.json({ error: "Invalid toy ID" }, { status: 400 });
    }

    const result = await sql`SELECT * FROM toys WHERE id = ${parseInt(id)}`;

    if (result.length === 0) {
      return Response.json({ error: "Toy not found" }, { status: 404 });
    }

    return Response.json({ toy: result[0] });
  } catch (error) {
    console.error("Error fetching toy:", error);
    return Response.json({ error: "Failed to fetch toy" }, { status: 500 });
  }
}

// Update a toy
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id || isNaN(parseInt(id))) {
      return Response.json({ error: "Invalid toy ID" }, { status: 400 });
    }

    const {
      toy_name,
      seller_name,
      seller_email,
      price,
      rating,
      available_quantity,
      description,
      picture_url,
      sub_category,
    } = body;

    const setClauses = [];
    const values = [];
    let paramCount = 0;

    if (toy_name !== undefined) {
      paramCount++;
      setClauses.push(`toy_name = $${paramCount}`);
      values.push(toy_name);
    }
    if (seller_name !== undefined) {
      paramCount++;
      setClauses.push(`seller_name = $${paramCount}`);
      values.push(seller_name);
    }
    if (seller_email !== undefined) {
      paramCount++;
      setClauses.push(`seller_email = $${paramCount}`);
      values.push(seller_email);
    }
    if (price !== undefined) {
      paramCount++;
      setClauses.push(`price = $${paramCount}`);
      values.push(price);
    }
    if (rating !== undefined) {
      paramCount++;
      setClauses.push(`rating = $${paramCount}`);
      values.push(rating);
    }
    if (available_quantity !== undefined) {
      paramCount++;
      setClauses.push(`available_quantity = $${paramCount}`);
      values.push(available_quantity);
    }
    if (description !== undefined) {
      paramCount++;
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
    }
    if (picture_url !== undefined) {
      paramCount++;
      setClauses.push(`picture_url = $${paramCount}`);
      values.push(picture_url);
    }
    if (sub_category !== undefined) {
      paramCount++;
      setClauses.push(`sub_category = $${paramCount}`);
      values.push(sub_category);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    const query = `UPDATE toys SET ${setClauses.join(", ")} WHERE id = $${paramCount + 1} RETURNING *`;
    values.push(parseInt(id));

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Toy not found" }, { status: 404 });
    }

    return Response.json({ toy: result[0] });
  } catch (error) {
    console.error("Error updating toy:", error);
    return Response.json({ error: "Failed to update toy" }, { status: 500 });
  }
}

// Delete a toy
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return Response.json({ error: "Invalid toy ID" }, { status: 400 });
    }

    const result =
      await sql`DELETE FROM toys WHERE id = ${parseInt(id)} RETURNING *`;

    if (result.length === 0) {
      return Response.json({ error: "Toy not found" }, { status: 404 });
    }

    return Response.json({
      message: "Toy deleted successfully",
      toy: result[0],
    });
  } catch (error) {
    console.error("Error deleting toy:", error);
    return Response.json({ error: "Failed to delete toy" }, { status: 500 });
  }
}
