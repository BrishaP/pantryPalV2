"use client"

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

interface FoodItem {
  id: number
  name: string
  expiryDate: string
  quantity: number
}

const foodItems: FoodItem[] = [
  { id: 1, name: "Milk", expiryDate: "2023-09-30", quantity: 1 },
  { id: 2, name: "Bread", expiryDate: "2023-09-25", quantity: 2 },
  { id: 3, name: "Eggs", expiryDate: "2023-10-05", quantity: 12 },
  { id: 4, name: "Cheese", expiryDate: "2023-10-15", quantity: 1 },
  { id: 5, name: "Yogurt", expiryDate: "2023-09-28", quantity: 4 },
  { id: 6, name: "Apples", expiryDate: "2023-10-10", quantity: 6 },
  { id: 7, name: "Chicken", expiryDate: "2023-09-26", quantity: 2 },
  { id: 8, name: "Tomatoes", expiryDate: "2023-09-27", quantity: 5 },
]

export default function Home() {
  
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  const handleQuantityChange = (change: number) => {
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change)
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Expiry Tracker</h1>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {foodItems.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedFood(item)}
            >
              <CardContent className="p-4">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Expires: {item.expiryDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">{selectedFood.name}</h2>
            <div className="mb-4">
              <Image 
                src="/placeholder.svg" 
                alt={selectedFood.name} 
                width={200} 
                height={200} 
                className="rounded-md"
              />
            </div>
            <p className="mb-2">Expiry Date: {selectedFood.expiryDate}</p>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold">{selectedFood.quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full" onClick={() => setSelectedFood(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}