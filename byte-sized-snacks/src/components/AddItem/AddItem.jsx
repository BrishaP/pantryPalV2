"use client";

import React, { useState } from 'react';
import './/AddItem.module.css';

const AddItem = ({ addFoodItem }) => {
    const [name, setName] = useState('');
    const [expiryDate, setExpiryDate] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (name && expiryDate) {
        addFoodItem({ name, expiryDate, id: Date.now() });
        setName('');
        setExpiryDate('');
      }
    }
  
  
    return (
      <form onSubmit = {handleSubmit}>
        <div>
          <lable>Food Item:</lable>
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          />
        </div>
        <button type="submit">Add Item</button>

      </form>
      )
    }

    export default AddItem;