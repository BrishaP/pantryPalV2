'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Minus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import './page.css';

const categories = [
  'Meat',
  'Fish',
  'Dairy',
  'Produce',
  'Bakery',
  'Pantry',
  'Other',
];

const foodItems = [
  {
    id: 1,
    name: 'Banana',
    expiryIn: '1',
    quantity: 1,
    category: 'Produce',
    image: '/images/banana.png',
  },
  {
    id: 2,
    name: 'Bread',
    expiryIn: '2',
    quantity: 2,
    category: 'Bakery',
    image: '/images/bread.webp',
  },
  {
    id: 3,
    name: 'Eggs',
    expiryIn: '3',
    quantity: 12,
    category: 'Dairy',
    image: '/images/eggs.jpeg',
  },
  {
    id: 4,
    name: 'Cheese',
    expiryIn: '4',
    quantity: 1,
    category: 'Dairy',
    image: '/images/cheese.jpg',
  },
  {
    id: 5,
    name: 'Yogurt',
    expiryIn: '5',
    quantity: 4,
    category: 'Dairy',
    image: '/images/yoghurt.png',
  },
  {
    id: 6,
    name: 'Apples',
    expiryIn: '5',
    quantity: 6,
    category: 'Produce',
    image: '/images/apples.png',
  },
  {
    id: 7,
    name: 'Chicken',
    expiryIn: '6',
    quantity: 2,
    category: 'Meat',
    image: '/images/chicken.jpg',
  },
  {
    id: 8,
    name: 'Tomatoes',
    expiryIn: '7',
    quantity: 5,
    category: 'Produce',
    image: '/images/tomato.jpeg',
  },
];

export default function Home( { additem } ) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Category');


  // NEED TO ADD: If quantity goes to 0, remove from DB

  // Need to ADD: When quantity changes, update DB
  const handleQuantityChange = (change) => {
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change),
      });
    }
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
                <p>x{item.quantity}</p>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
                <p>Expires in: {item.expiryIn} day(s)</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <h2>{selectedFood.name}</h2>
            <h3>{selectedFood.category}</h3>
            <div className="imageContainer">
              <Image
                src={selectedFood.image}
                alt={selectedFood.name}
                width={200}
                height={200}
                className="foodImage"
              />
            </div>
            // Dropdown category
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  {selectedCategory}
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
            <p>Expires In: {selectedFood.expiryIn} day(s)</p>
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
          </div>
        </div>
      )}
    </div>
  );
}
