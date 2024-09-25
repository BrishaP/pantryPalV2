// import {getItems, createItem } from './supabase.js';

// const testDatabase = async () => {
//   // Create an item
//   const newItem = { 
//     name: 'CARROT',
//     category: 'Produce',
//     stored_location: 'Fridge',
//     expiry_date: '2023-12-31',
//     quantity: 10,
//     weight: 1.5,
//     opened_date: null,
//     days_valid_after_opening: null,
//     expiry_notification: true 
//   };
//   try {
//     const createdItem = await createItem(newItem);
//     console.log('Created Item:', createdItem);
//   } catch (error) {
//     console.error('Error creating item:', error);
//   }

//   // Read items
//   let items;
//   try {
//     items = await getItems();
//     console.log('Items:', items);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//   }

//   // Update an item
//   // if (items && items.length > 0) {
//   //   const itemId = items[0].item_id; // Assuming item_id is the primary key
//   //   const updatedData = { quantity: 20 };
//   //   try {
//   //     const updatedItem = await updateItem(itemId, updatedData);
//   //     console.log('Updated Item:', updatedItem);
//   //   } catch (error) {
//   //     console.error('Error updating item:', error);
//   //   }
//   // }

//   // Delete an item
//   // if (items && items.length > 0) {
//   //   const itemId = items[0].item_id; // Assuming item_id is the primary key
//   //   try {
//   //     const deletedItem = await deleteItem(itemId);
//   //     console.log('Deleted Item:', deletedItem);
//   //   } catch (error) {
//   //     console.error('Error deleting item:', error);
//   //   }
//   // }


  
// };

// testDatabase();



import { getItems, createItem } from './supabase.js';

const testDatabase = async () => {
  // Create an item
  const newItem = { 
    name: 'pineapple',
    category: 'Produce',
    stored_location: 'Fridge',
    expiry_date: '2023-12-31',
    quantity: 10,
    weight: 1.5,
    opened_date: null,
    days_valid_after_opening: null,
    expiry_notification: true 
  };
  try {
    const createdItem = await createItem(newItem);
    console.log('Created Item:', createdItem);
  } catch (error) {
    console.error('Error creating item:', error);
  }

  // Read items
  let items;
  try {
    items = await getItems();
    console.log('Items :', items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }

  // Update an item
  // if (items && items.length > 0) {
  //   const itemId = items[0].item_id; // Assuming item_id is the primary key
  //   const updatedData = { quantity: 20 };
  //   try {
  //     const updatedItem = await updateItem(itemId, updatedData);
  //     console.log('Updated Item:', updatedItem);
  //   } catch (error) {
  //     console.error('Error updating item:', error);
  //   }
  // }

  // Delete an item
  // if (items && items.length > 0) {
  //   const itemId = items[0].item_id; // Assuming item_id is the primary key
  //   try {
  //     const deletedItem = await deleteItem(itemId);
  //     console.log('Deleted Item:', deletedItem);
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // }
};

testDatabase();