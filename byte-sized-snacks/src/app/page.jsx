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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Minus, ChevronDown } from "lucide-react";
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

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    expiry_date: "",
    quantity: "",
  });

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
        }
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

  const handleQuantityChange = (change) => {
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormOpen(false);
    console.log(newItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    setNewItem({
      ...newItem,
      category: e.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Food Expiry Tracker</h1>
      <ScrollArea className="scrollArea">
        <div className="foodGrid">
          {foodItems.map((item) => (
            <Card
              key={item.id}
              className="foodItem"
              onClick={() => setSelectedFood(item)}
            >
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

      <div className="hoverButtonWrapper">
        <Button className="hoverButton" onClick={() => setFormOpen(true)}>
          <Plus className="buttonIcon" />
        </Button>
      </div>

      {formOpen && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <form className="productForm" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Choose a produce type:
                <select
                  name="category"
                  id="category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Enter</button>
            </form>
          </div>
        </div>
      )}

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <form className="productForm" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="itemName"
                  value={selectedFood.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-between"
                  >
                    {selectedCategory || "Select Category"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="imageContainer">
                <Image
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
              </div>
              <label>
                Expires On:
                <input
                  type="text"
                  name="itemExpiry"
                  value={selectedFood.expiry_date}
                  onChange={handleChange}
                  required
                />
              </label>
              Quantity:
              <div className="quantityControl">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="icon" />
                </Button>
                <span className="quantity">{selectedFood.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="icon" />
                </Button>
              </div>
              <Button
                className="closeButton"
                onClick={() => setSelectedFood(null)}
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
