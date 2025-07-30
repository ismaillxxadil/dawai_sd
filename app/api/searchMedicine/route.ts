import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  // If the query is empty, return an empty array
  if (!query.trim()) {
    return Response.json([]);
  }

  const { data, error } = await supabase
    .from("medicines")
    .select(
      `
      name,
      description,
      quantity,
      price,
      pharmacy:pharmacies (
        id,
        name,
        lat,
        lng,
        address,
        work_start,
        work_end
      ),
      img,
      type,
      created_at
    `
    )
    .ilike("name", `%${query}%`);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 200 });
}
