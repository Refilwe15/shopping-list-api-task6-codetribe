import { Item } from "../types/item";

// In-memory list
let shoppingList: Item[] = [];
let currentId = 1;

// Get all items
export const getShoppingList = (): Item[] => {
  return shoppingList;
};

// Get item by ID
export const getItemById = (id: number): Item | undefined => {
  return shoppingList.find((item) => item.id === id);
};

// Add new item
export const addItem = (name: string, quantity: number, price: number): Item => {
  const newItem: Item = {
    id: currentId++,
    name,
    quantity,
    price,
  };
  shoppingList.push(newItem);
  return newItem;
};

// Update item by ID
export const updateItemById = (
  id: number,
  name?: string,
  quantity?: number,
  price?: number
): Item | undefined => {
  const itemIndex = shoppingList.findIndex((item) => item.id === id);
  if (itemIndex === -1) return undefined;

  // Update only provided fields
  if (name) shoppingList[itemIndex].name = name;
  if (quantity && quantity > 0) shoppingList[itemIndex].quantity = quantity;
  if (price && price > 0) shoppingList[itemIndex].price = price;

  return shoppingList[itemIndex];
};

// (Optional) Reset list for testing
export const resetShoppingList = (): void => {
  shoppingList = [];
  currentId = 1;
};
