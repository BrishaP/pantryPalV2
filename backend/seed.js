import { supabase } from "./supabase.js"; // Adjust the import path as needed

export const seedData = async () => {
  const seedItems = [
    {
      name: "Chicken Breast",
      category: "Meat",
      stored_location: "Fridge",
      expiry_date: "2023-12-01",
      quantity: 10,
      weight: 2.5,
      opened_date: "2023-11-25",
      days_valid_after_opening: 5,
    },
    {
      name: "Salmon Fillet",
      category: "Fish",
      stored_location: "Freezer",
      expiry_date: "2024-01-15",
      quantity: 5,
      weight: 1.2,
      opened_date: null,
      days_valid_after_opening: null,
    },
    {
      name: "Milk",
      category: "Dairy",
      stored_location: "Fridge",
      expiry_date: "2023-11-30",
      quantity: 2,
      weight: 1.0,
      opened_date: "2023-11-20",
      days_valid_after_opening: 7,
    },
    // Add more items as needed
  ];

  const { data, error } = await supabase
    .from("food_inventory")
    .insert(seedItems);

  if (error) {
    console.error("Error seeding data:", error);
    return null;
  }
  return data;
};

// Call the seedData function if this file is run directly
if (require.main === module) {
  seedData().then((data) => {
    if (data) {
      console.log("Data seeded successfully:", data);
    }
  });
}
