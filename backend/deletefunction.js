// import { deleteItem, getItems} from './supabase.js'; // Removed getItems import as it's not needed

// const testDatabase = async () => {
//   // Directly set the itemId to the specific item_id you want to delete
//   const itemId = '2024-09-25T09:53:46.703';

//   try {
//     const deletedItem = await deleteItem(itemId);
//     console.log('Deleted Item:', deletedItem);
//   } catch (error) {
//     console.error('Error deleting item:', error);
//   }
// };

// // Read items
// let items;
// try {
//   items = await getItems();
//   console.log('Items:', items);
// } catch (error) {
//   console.error('Error fetching items:', error);
// }

// testDatabase();

import { deleteItem, getItems } from './supabase.js'; // Import deleteItem and getItems functions

const testDatabase = async () => {
  // Directly set the itemId to the specific item_id you want to delete
  const itemId = '2024-09-25T09:53:46.703';

  try {
    const deletedItem = await deleteItem(itemId);
    console.log('Deleted Item:', deletedItem);
  } catch (error) {
    console.error('Error deleting item:', error);
  }

  // Read items
  let items;
  try {
    items = await getItems();
    console.log('Items:', items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

testDatabase();