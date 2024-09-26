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

export async function POST(request) {
  try {
    const { name, category, expiry_date, quantity } = await request.json();

    const { data, error } = await supabase
      .from("food_inventory")
      .insert([{ name, category, expiry_date, quantity }])
      .select();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding food item:", error);
    return NextResponse.json(
      { error: "Failed to add food item" },
      { status: 500 }
    );
  }
}