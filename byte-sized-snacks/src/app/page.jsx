"use client"

import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"
import "./page.css";

const foodItems = [
  { id: 1, name: "Banana", expiryDate: "2023-09-30", quantity: 1, image: '/images/banana.png' },
  { id: 2, name: "Bread", expiryDate: "2023-09-25", quantity: 2 },
  { id: 3, name: "Eggs", expiryDate: "2023-10-05", quantity: 12 },
  { id: 4, name: "Cheese", expiryDate: "2023-10-15", quantity: 1 },
  { id: 5, name: "Yogurt", expiryDate: "2023-09-28", quantity: 4 },
  { id: 6, name: "Apples", expiryDate: "2023-10-10", quantity: 6 },
  { id: 7, name: "Chicken", expiryDate: "2023-09-26", quantity: 2 },
  { id: 8, name: "Tomatoes", expiryDate: "2023-09-27", quantity: 5 },
]

export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null)

  const handleQuantityChange = (change) => {
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change)
      })
    }
  }

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
                
                <p>Expires: {item.expiryDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <h2>{selectedFood.name}</h2>
            <div className="imageContainer">
              <Image 
                src={selectedFood.image} 
                alt={selectedFood.name} 
                width={200} 
                height={200} 
                className="foodImage"
              />
            </div>
            <p>Expiry Date: {selectedFood.expiryDate}</p>
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
            <Button className="closeButton" onClick={() => setSelectedFood(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}