import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("food_inventory")
      .select("*")
      .order("expiry_date", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching food items:", error);
    return NextResponse.json(
      { error: "Failed to fetch food items" },
      { status: 500 },
    );
  }
}

// export async function POST(request) {
//   try {
//     const { name, category, expiry_date, quantity } = await request.json();

//     const { data, error } = await supabase
//       .from("food_inventory")
//       .insert([{ name, category, expiry_date, quantity }])
//       .select();

//     if (error) throw error;
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error adding food item:", error);
//     return NextResponse.json(
//       { error: "Failed to add food item" },
//       { status: 500 }
//     );
//   }
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, category, expiry_date, quantity } = req.body;

    // Validate the input
    if (!name || !category || !expiry_date || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert the new food item into the database
    const { data, error } = await supabase
      .from('food_inventory')
      .insert([{ name, category, expiry_date, quantity }]);

    if (error) {
      console.error('Error inserting food item:', error);
      return res.status(500).json({ error: 'Failed to add food item' });
    }

    res.status(200).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}