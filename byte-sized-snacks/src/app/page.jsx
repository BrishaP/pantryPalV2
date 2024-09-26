"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Minus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import "./page.css";

const categories = [
  "Meat",
  "Fish",
  "Dairy",
  "Produce",
  "Bakery",
  "Pantry",
  "Other",
];

const foodItems = [
  {
    id: 1,
    name: "Banana",
    expiry_date: "2023-12-31",
    quantity: 1,
    category: "Produce",
    image: "/images/banana.png",
  },
  {
    id: 2,
    name: "Bread",
    expiry_date: "2023-12-31",
    quantity: 2,
    category: "Bakery",
    image: "/images/bread.webp",
  },
  {
    id: 3,
    name: "Eggs",
    expiry_date: "2023-12-31",
    quantity: 12,
    category: "Dairy",
    image: "/images/eggs.jpeg",
  },
  {
    id: 4,
    name: "Cheese",
    expiry_date: "2023-12-31",
    quantity: 1,
    category: "Dairy",
    image: "/images/cheese.jpg",
  },
  {
    id: 5,
    name: "Yogurt",
    expiry_date: "2023-12-31",
    quantity: 4,
    category: "Dairy",
    image: "/images/yoghurt.png",
  },
  {
    id: 6,
    name: "Apples",
    expiry_date: "2023-12-31",
    quantity: 6,
    category: "Produce",
    image: "/images/apples.png",
  },
  {
    id: 7,
    name: "Chicken",
    expiry_date: "2023-12-31",
    quantity: 2,
    category: "Meat",
    image: "/images/chicken.jpg",
  },
  {
    id: 8,
    name: "Tomatoes",
    expiry_date: "2023-12-31",
    quantity: 5,
    category: "Produce",
    image: "/images/tomato.jpeg",
  },
];

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const fetchFoodItems = async () => {
      const { data, error } = await supabase
        .from("food_inventory")
        .select("*")
        .order("expiry_date", { ascending: true });

      if (error) {
        console.error("Error fetching food items:", error);
      } else {
        setFoodItems(data);
      }
    };

    fetchFoodItems();

    const subscription = supabase
      .channel("food_inventory_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_inventory" },
        (payload) => {
          console.log("Change received!", payload);
          fetchFoodItems();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getCategoryImage = (category) => {
    const images = {
      Meat: "/images/meat.png",
      Fish: "/images/fish.png",
      Dairy: "/images/dairy.png",
      Produce: "/images/produce.png",
      Bakery: "/images/bakery.png",
      Pantry: "/images/pantry.png",
      Other: "/images/other.png",
    };
    return images[category] || images["Other"];
  };

  return (
    <div className="container">
      <h1>Food Expiry Tracker</h1>
      <ScrollArea className="scrollArea">
        <div className="foodGrid">
          {foodItems.map((item) => (
            <Card key={item.item_id} className="foodItem">
              <CardContent className="foodItemContent">
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <Image
                  src={getCategoryImage(item.category)}
                  alt={item.category}
                  width={200}
                  height={200}
                  className="foodImage"
                />
                <p>
                  Expires on: {new Date(item.expiry_date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
