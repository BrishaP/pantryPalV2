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
    expiry_date: '2023-12-31',
    quantity: 1,
    category: 'Produce',
    image: '/images/banana.png',
  },
  {
    id: 2,
    name: 'Bread',
    expiry_date: '2023-12-31',
    quantity: 2,
    category: 'Bakery',
    image: '/images/bread.webp',
  },
  {
    id: 3,
    name: 'Eggs',
    expiry_date: '2023-12-31',
    quantity: 12,
    category: 'Dairy',
    image: '/images/eggs.jpeg',
  },
  {
    id: 4,
    name: 'Cheese',
    expiry_date: '2023-12-31',
    quantity: 1,
    category: 'Dairy',
    image: '/images/cheese.jpg',
  },
  {
    id: 5,
    name: 'Yogurt',
    expiry_date: '2023-12-31',
    quantity: 4,
    category: 'Dairy',
    image: '/images/yoghurt.png',
  },
  {
    id: 6,
    name: 'Apples',
    expiry_date: '2023-12-31',
    quantity: 6,
    category: 'Produce',
    image: '/images/apples.png',
  },
  {
    id: 7,
    name: 'Chicken',
    expiry_date: '2023-12-31',
    quantity: 2,
    category: 'Meat',
    image: '/images/chicken.jpg',
  },
  {
    id: 8,
    name: 'Tomatoes',
    expiry_date: '2023-12-31',
    quantity: 5,
    category: 'Produce',
    image: '/images/tomato.jpeg',
  },
];

export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formOpen, setFormOpen] = useState(false);



  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    expiry_date: '',
    quantity: '',
  });

  console.log(formOpen)



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
      [category]: value,
     
    });
  };

  const handleCategoryChange = (value) => {
    setNewItem({
      ...newItem,
      category: value,
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
                <p>x{item.quantity}</p>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
                <p>Expires on: {item.expiry_date} </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className='hoverButtonWrapper'>
          <Button className='hoverButton' onClick={() => setFormOpen(true)} >
            <Plus className='buttonIcon' />
          </Button>
          
        </div>

        {formOpen && (
          <div className="overlay" role="dialog" aria-modal="true">
            <div className="overlayContent">
              <form className="productForm" onSubmit={handleSubmit}>
                <label>Name:
                  <input type='text' name='name' value={newItem.name} onChange={(e) => {handleChange(e)}} required />
                </label>
                <label for="cars">Choose a produce type:</label>
                <select name="category" id="category" onChange={handleCategoryChange}>
                  <option value="meat" >Meat</option>
                  <option value="fish">Fish</option>
                  <option value="dairy">Dairy</option>
                  <option value="produce">Produce</option>
                  <option value="bakery">Baker</option>
                  <option value="pantry">Pantry</option>
                  <option value="other">Other</option>
                </select>


                <button type="submit">Enter</button>
                </form>
              </div>
            </div>
)}
                

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">
            <form className="productForm" onSubmit={handleSubmit}>
              <label>Name:
                <input type='text' name='itemName' value={newItem} onChange={handleChange} required />
              </label>
            
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

              <div className="imageContainer">
                <Image
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  width={200}
                  height={200}
                  className="foodImage"
                />
              </div> 

              <label>Expires On:
                <input type='text' name='itemExpiry' value={selectedFood.expiry_date} onChange={handleChange} required />
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
