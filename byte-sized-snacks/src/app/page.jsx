"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupSchema } from "../Schema/index";
import styled from "styled-components";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Minus, X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import "./page.css";

// Define the styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: #f0f0f0;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: green;
`;

const StyledTitle = styled.label`
  margin-bottom: 15px;
  font-weight: bold;
`;

const StyledField = styled(Field)`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorContainer = styled.div`
  margin-bottom: 15px;
  color: red;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const initialValues = {
  name: "",
  category: "",
  expiry_date: "",
  quantity: "",
};

const categories = [
  "meat",
  "fish",
  "dairy",
  "produce",
  "bakery",
  "pantry",
  "other",
];

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

function expiryStatus(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  now.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  const timeDifference = expiry - now;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  function pluralize(days) {
    return days === 1 ? "" : "s";
  }

  let statusText = "";
  let isExpiringSoon = false;

  if (daysDifference < 0) {
    const daysAgo = Math.abs(daysDifference);
    statusText = `Expired ${daysAgo} day${pluralize(daysAgo)} ago`;
  } else if (daysDifference === 0) {
    statusText = "Expiring today";
    isExpiringSoon = true;
  } else {
    statusText = `Expires in ${daysDifference} day${pluralize(daysDifference)}`;
    if (daysDifference <= 3) {
      isExpiringSoon = true;
    }
  }

  return { statusText, isExpiringSoon };
}

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

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
        console.log("Fetched food items:", data); // Log the fetched data
        setFoodItems(data);
        
        checkExpiringItems(data);
      }
    };

    const checkExpiringItems = (data) => {
      data.forEach((item) => {
        const { isExpiringSoon } = expiryStatus(item.expiry_date);
        if (isExpiringSoon) {
          const notifyD = () => toast(`${item.name} expires soon`, { containerId: "D" });
          notifyD();
        }
      });
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

  const notifyA = () => toast("Successfully Submitted!", {containerId: "A"});
  const notifyB = () => toast("Successfully Edited!", {containerId: "B"});
  const notifyC = () => toast("Successfully Deleted!", {containerId: "C"});
  
  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const onSubmit = async (values, actions) => {

    values.name = values.name.trim();
    values.name = capitalizeName(values.name);

    try {
      const response = await fetch("/api/food-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to add food item: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("Food item added:", data);

      // Update the food items state to include the new item and sort by expiry_date
      setFoodItems((prevItems) => {
        const updatedItems = [...prevItems, ...data];
        return updatedItems.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
      });

      actions.resetForm();
      notifyA();
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const handleQuantityChange = (change, e) => {
    if (e) e.preventDefault();
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(1, selectedFood.quantity + change),
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("handleEditSubmit");
    notifyB();
  
    if (!selectedFood) return;
  
    try {
      const response = await fetch('/api/food-items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: selectedFood.item_id,
          name: selectedFood.name,
          category: selectedFood.category,
          expiry_date: selectedFood.expiry_date,
          quantity: selectedFood.quantity,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message);
        setSelectedFood(null);
        // Optionally, refresh the food items list here
      } else {
        console.error("Failed to update food item", result.error);
      }
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFood) return;
  
    try {
      const response = await fetch('/api/food-items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedFood.item_id }), // Use item_id instead of id
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message);
        notifyC();

        setSelectedFood(null);
        // Optionally, refresh the food items list here
      } else {
        console.error("Failed to delete food item", result.error);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setSelectedFood({
      ...selectedFood,
      [name]: value,
    });
  };

  const getCategoryImage = (category) => {
    const images = {
      meat: "/images/meat.png",
      fish: "/images/fish.png",
      dairy: "/images/dairy.png",
      produce: "/images/produce.png",
      bakery: "/images/bakery.png",
      pantry: "/images/pantry.png",
      other: "/images/other.png",
    };

    console.log(category);
    return images[category] || images["other"];
  };


  return (
    <div className="container">


      <h1>Food Expiry Tracker</h1>
      <div className="toastcontainer"><ToastContainer containerId="B"/></div>
      <div className="toastcontainer"><ToastContainer containerId="C"/></div>
      <div className="toastcontainer"><ToastContainer containerId="D"/></div>

      <ScrollArea className="scrollArea">
        <div className="foodGrid">
        {foodItems.map((item) => {
  const { statusText, isExpiringSoon } = expiryStatus(item.expiry_date);

  return (
    <Card
      key={item.item_id}
      className="foodItem"
      onClick={() => setSelectedFood(item)}
    >
      <CardContent className="foodItemContent">
        <h2>{item.name}</h2>
        <p>x{item.quantity}</p>
        <p>{item.category}</p>
        <Image
          src={getCategoryImage(item.category)}
          alt={item.category}
          width={200}
          height={200}
          className="foodImage"
        />
        <p className={isExpiringSoon ? "expiring-soon" : ""}>{statusText}</p>
      </CardContent>
    </Card>
  );
})}
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
            <Container>
              <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <StyledForm>
                        
                      <X onClick={() => setFormOpen(false)} />
                      <StyledTitle>Add Product</StyledTitle>

                        {/* item name entry and error message */}
                        <StyledLabel htmlFor="name">Name:</StyledLabel>
                        <Field type="text" id="name" name="name" placeholder="Enter product name" />
            
                        <ErrorContainer>
                        {touched.name && errors.name && (
                            <p className="form_error">{errors.name}</p>)}
                        </ErrorContainer>
                    

                        {/* item quantity and error message */}
                        <StyledLabel htmlFor="name">Quantity:</StyledLabel>
                        <StyledField type="number" id="quantity" name="quantity" placeholder="Enter quantity" />
            
                        <ErrorContainer>
                            {touched.quantity && errors.quantity && (
                            <p className="form_error">{errors.quantity}</p>
                            )}
                        </ErrorContainer>


                        {/* item CATEGORY and error message */}
            
          
                        <StyledLabel htmlFor="category">Select a category:</StyledLabel>
                        
                    {/* <StyledCategoryInput> */}
                        <Field as="select" name="category" id="category" style={{ display: "block" }}>
                        <option value="" label="Select a category">Select a category</option>
                        <option value="dairy" label="Dairy">Dairy</option>
                        <option value="produce" label="Produce">Produce</option>
                        <option value="meat" label="Meat">Meat</option>
                        <option value="pantry" label="Pantry">Pantry</option>
                        <option value="fish" label="Fish">Fish</option>
                        <option value="bakery" label="bakery">Bakery</option>
                        <option value="other" label="Other">Other</option>
                        </Field>
                    {/* </StyledCategoryInput> */}

                        <ErrorContainer>
                        {touched.category && errors.category && <p className="form_error">{errors.category}</p>}
                        </ErrorContainer>


                        {/* item expiry date and error message */}
                        <StyledLabel htmlFor="expiry_date">Expiry Date:</StyledLabel>
                        <StyledField type="date" id="expiry_date" name="expiry_date" min={getCurrentDate()} />
                        
                        <ErrorContainer>
                        {touched.expiry_date && errors.expiry_date && (
                            <p className="form_error">{errors.expiry_date}</p>)}
                        </ErrorContainer>




                        <SubmitButton type="submit">
                            Submit
                        </SubmitButton>
                        
                          <div className="toastcontainer"><ToastContainer containerId="A"/></div>
                        
        
                
                    </StyledForm>
                )}
            </Formik>
                
        </Container>

            
          </div>
        </div>
      )}

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">

          <Button type="button" onClick={handleDelete} className="text-sm px-2 py-1 bg-red-500 text-white rounded ml-auto">
          Delete item</Button>

            <form className="productForm" onSubmit={handleEditSubmit}>
          
              <X onClick={() => setSelectedFood(null)} />
              <label>
                Name:
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={selectedFood.name}
                  onChange={(e) => {
                    handleModify(e);
                  }}
                  required
                />
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-between"
                  >
                    {selectedFood.category}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => {
                        const updatedFood = {
                          ...selectedFood,
                          category: category,
                        };
                        setSelectedFood(updatedFood);
                      }}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="imageContainer">
                <Image
                  src={getCategoryImage(selectedFood.category)}
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
                  name="expiry_date"
                  value={selectedFood.expiry_date}
                  onChange={(e) => {
                    handleModify(e);
                  }}
                  required
                />
              </label>

              Quantity:
              <div className="quantityControl">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="icon" />
                </Button>
                <span className="quantity">{selectedFood.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="icon" />
                </Button>
              </div>
              <Button className="closeButton" type="submit">
                Save
              </Button>


            </form>
          </div>
        </div>
      )}
    </div>
  );
}