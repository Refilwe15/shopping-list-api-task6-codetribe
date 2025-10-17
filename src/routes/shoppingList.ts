import { IncomingMessage, ServerResponse } from "http";
import {
  getShoppingList,
  getItemById,
  addItem,
  updateItemById,
  deleteItemById,
} from "../controllers/shoppingList";

// Route handler: http://localhost:3000/shoppinglist
export const shoppingListRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/shoppinglist")) {
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;

    // GET all items
    if (req.method === "GET" && !id) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(getShoppingList()));
      return;
    }

    // GET item by ID
    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item id" }));
        return;
      }

      const item = getItemById(id);
      if (!item) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(item));
      return;
    }

    // POST new item
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        try {
          const { name, quantity, price } = JSON.parse(body);

          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item name is required" }));
            return;
          }

          if (typeof quantity !== "number" || quantity <= 0) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Quantity must be a positive number" }));
            return;
          }

          if (typeof price !== "number" || price <= 0) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Price must be a positive number" }));
            return;
          }

          const newItem = addItem(name, quantity, price);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    // PUT update item by ID
    if (req.method === "PUT" && id) {
      let body = "";
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        try {
          const { name, quantity, price } = JSON.parse(body);
          const updatedItem = updateItemById(id, name, quantity, price);

          if (!updatedItem) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item not found" }));
            return;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(updatedItem));
        } catch {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    // DELETE item by ID
    if (req.method === "DELETE" && id) {
      const deleted = deleteItemById(id);

      if (!deleted) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `Item ${id} deleted successfully` }));
      return;
    }

    // Method not allowed
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
  }
};
