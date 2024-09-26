"use client";
import React, { useState  } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';



import { Formik, Form, Field } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { signupSchema } from '../Schema/index';
import styled from 'styled-components';

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
import { Plus, Minus, X } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import './page.css';

//CROM 
// Define the styled components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* Full viewport height */
  background-color: #f0f0f0; /* Optional: background color for the page */
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
}
/////

const categories = [
  "Meat",
  "Fish",
  "Dairy",
  "Produce",
  "Bakery",
  "Pantry",
  "Other",
];

// {
//   item_id: '2024-09-25T11:32:44.65905',
//   name: 'Strawberry',
//   category: 'Produce',
//   stored_location: 'Fridge',
//   expiry_date: '2023-12-31',
//   quantity: 10,
//   weight: 1.5,
//   opened_date: null,
//   days_valid_after_opening: null,
//   expiry_notification: true
// }

const foodItems = [
  {
    id: 1,

    name: 'Banana',
    expiry_date: '2024-10-06',
    quantity: 1,
    category: 'Produce',
    image: '/images/dairy.png',
  },
  {
    id: 2,
    name: 'Bread',
    expiry_date: '2024-09-26',
    quantity: 2,
    category: 'Bakery',
    image: '/images/dairy.png',
  },
  {
    id: 3,
    name: 'Eggs',
    expiry_date: '2024-10-02',
    quantity: 12,
    category: 'Dairy',
    image: '/images/dairy.png',
  },
  {
    id: 4,
    name: 'Cheese',
    expiry_date: '2024-09-30',
    quantity: 1,
    category: 'Dairy',
    image: '/images/dairy.png',
  },
  {
    id: 5,
    name: 'Yogurt',
    expiry_date: '2024-09-28',
    quantity: 4,
    category: 'Dairy',
    image: '/images/dairy.png',
  },
  {
    id: 6,
    name: 'Apples',
    expiry_date: '2024-10-05',
    quantity: 6,
    category: 'Produce',
    image: '/images/dairy.png',
  },
  {
    id: 7,
    name: 'Chicken',
    expiry_date: '2024-09-29',
    quantity: 2,
    category: 'Meat',
    image: '/images/dairy.png',
  },
  {
    id: 8,
    name: 'Tomatoes',
    expiry_date: '2024-09-25',
    quantity: 5,
    category: 'Produce',
    image: '/images/dairy.png',
  },
];

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

function expiryStatus(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);

  // Set the time part of both dates to midnight for accurate day comparison
  now.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  // Get the difference in time (milliseconds)
  const timeDifference = expiry - now;

  // Convert the time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Helper function to add plural 's' if needed
  function pluralize(days) {
    return days === 1 ? '' : 's';
  }

  if (daysDifference < 0) {
    const daysAgo = Math.abs(daysDifference);
    return `Expired ${daysAgo} day${pluralize(daysAgo)} ago`;
  } else if (daysDifference === 0) {
    return "Expiring today";
  } else {
    return `Expires in ${daysDifference} day${pluralize(daysDifference)}`;
  }
}


export default function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  
  //FOR NEW ITEM
  const [formOpen, setFormOpen] = useState(false);


  // const [newItem, setNewItem] = useState({
  //   name: '',
  //   category: '',
  //   expiry_date: '',
  //   quantity: '',
  // });

  // const handleSubmit = (e) => {
  //       // Fire POST API call with details in newItem
  //   e.preventDefault();
  //   setFormOpen(false);
  //   console.log(newItem);
  // };

  const notify = () => toast("Successfully Submitted!");

  const onSubmit=(values, actions) => {
    console.log(values);
    actions.resetForm();
    notify();
  }

  
  // const handleCategoryChange = (value) => {
  //   setNewItem({
  //     ...newItem,
  //     category: event.target.value,
  //   });
  // };


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewItem({
  //     ...newItem,
  //     [name]: value,
  //     [category]: value,
  //   });
  // };

  // FOR EDIT CURRENT ITEM
  const handleQuantityChange = (change, e) => {
    if (e) e.preventDefault();
    if (selectedFood) {
      setSelectedFood({
        ...selectedFood,
        quantity: Math.max(0, selectedFood.quantity + change),
      });
    }
  };

  const handleEditSubmit = (e) => {
    // Fire edit API call with details in selectedFood
    e.preventDefault();
    console.log('handleEditSubmit');
    setSelectedFood(null);
  };

  const handleModify = (e) => {
    const { name, value } = e.target;
    setSelectedFood({
      ...selectedFood,
      [name]: value,

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
                <p> {expiryStatus(item.expiry_date)}</p>
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


        <Container>
            <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={onSubmit}>


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


                        {/* item category and error message */}
                      
                        <StyledLabel htmlFor="category">Category:</StyledLabel>
                         <StyledField type="text" id="category" name="category" placeholder="Enter a category" />
                        

                        <ErrorContainer>
                        {touched.category && errors.category && (
                            <p className="form_error">{errors.category}</p>)}
                        </ErrorContainer>
                        <div className="error_container"></div>


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
            
                        <ToastContainer />
        
                
                    </StyledForm>
                )}
            </Formik>
                
        </Container>

            {/* <form className="productForm" onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
              </label>
              <label for="cars">Choose a produce type:</label>
              <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
              >
                <option value="meat">Meat</option>
                <option value="fish">Fish</option>
                <option value="dairy">Dairy</option>
                <option value="produce">Produce</option>
                <option value="bakery">Baker</option>
                <option value="pantry">Pantry</option>
                <option value="other">Other</option>
              </select>

              <button type="submit">Enter</button>

            </form> */}





          </div>
        </div>
      )}

      {selectedFood && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="overlayContent">

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
