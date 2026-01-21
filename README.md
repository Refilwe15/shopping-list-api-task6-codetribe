
## Project Description

The Shopping List API is a simple RESTful API built with Node.js and TypeScript that allows users to manage a shopping list. It supports adding, viewing, updating, and deleting items. The data is stored in memory, and all operations can be tested using Postman.

##  Features

- Create new shopping list items  
- Retrieve all items or a specific item by ID  
- Update existing items  
- Delete items by ID  
- TypeScript for clean, typed code  

## Installation


### Clone the repository

git clone
cd shopping-list-api-task6-codetribe

### How to run the app

npm install
npm run dev

### Routes For TESTING

## ADDING ITEM

POST

http://localhost:3000/shoppinglist/

{
  "name": "Bread",
  "quantity": 1,
  "price": 12
}

## GETTING ITEM BY ID

GET

http://localhost:3000/shoppinglist/


## Update item by ID

PUT

http://localhost:3000/shoppinglist/1

## DELETE ITEM BY ID

DELETE

http://localhost:3000/shoppinglist/1

## GET ALL ITEMS

GET

http://localhost:3000/shoppinglist




