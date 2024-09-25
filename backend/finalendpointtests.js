import { getItems, createItem, deleteItem, updateItem} from './supabase.js';

const testDatabase = async () => {
  // Create an item
  const newItem = { 
    name: 'Kiwi',
    category: 'Produce',
    stored_location: 'Fridge',
    expiry_date: '2023-12-31',
    quantity: 10,
    weight: 1.5,
    opened_date: null,
    days_valid_after_opening: null,
    expiry_notification: true 
  };
  // let createdItem;
  // try {
  //   createdItem = await createItem(newItem);
  //   console.log('Created Item:', createdItem);
  // } catch (error) {
  //   console.error('Error creating item:', error);
  // }

  // Update a specific item by item_id
  const itemId = '2024-09-25T11:41:26.480225'; // Assuming item_id is the primary key
  const updatedData = { quantity: 20, name: 'Updated Kiwi' }; // Example of fields to update
  try {
    const updatedItem = await updateItem(itemId, updatedData);
    console.log('Updated Item:', updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
  }


  // Read items
  let items;
  try {
    items = await getItems();
    console.log('Items :', items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }



  //delete items
  const itemId = '2024-09-25T11:42:55.462381';

  try {
    const deletedItem = await deleteItem(itemId);
    console.log('Deleted Item:', deletedItem);
  } catch (error) {
    console.error('Error deleting item:', error);
  }

};

testDatabase();