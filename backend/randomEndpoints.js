import { supabase } from "./supabase.js";
export const getItemsByCategory = async (category) => {
  const { data, error } = await supabase
    .from("food_inventory")
    .select("*")
    .eq("category", category) // Filter by category
    .order("expiry_date", { ascending: true }); // Order by expiry_date (soonest first)

  if (error) {
    console.error("Error fetching items by category:", error);
    return [];
  }
  return data;
};
