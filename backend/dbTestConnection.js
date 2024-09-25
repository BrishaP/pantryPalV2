import { supabase } from "./supabase.js";

const testConnection = async () => {
  const { data, error } = await supabase
    .from("food_inventory")
    .select("*")
    .limit(10);

  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log("Database connection successful:", data);
  }
};

testConnection();
