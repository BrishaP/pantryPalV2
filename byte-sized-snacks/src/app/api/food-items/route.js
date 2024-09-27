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
    console.log("Received data:", { name, category, expiry_date, quantity });

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

export async function DELETE(request) {
  console.log("DELETE request received");
  try {
    const { id } = await request.json();
    console.log("Deleting item with id:", id);
    const { data, error } = await supabase
      .from("food_inventory")
      .delete()
      .eq("item_id", id); // Use item_id instead of id

    if (error) throw error;
    console.log("Item deleted successfully");
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    return NextResponse.json(
      { error: "Failed to delete food item" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  console.log("PUT request received");
  try {
    const { item_id, name, category, expiry_date, quantity } = await request.json();
    console.log("Updating item with id:", item_id);

    const { data, error } = await supabase
      .from("food_inventory")
      .update({ name, category, expiry_date, quantity })
      .eq("item_id", item_id);

    if (error) throw error;
    console.log("Item updated successfully");
    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      { error: "Failed to update food item" },
      { status: 500 }
    );
  }
}