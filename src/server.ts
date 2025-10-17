import http, { IncomingMessage, ServerResponse } from "http";
import { shoppingListRoute } from "./routes/shoppingList";

const PORT = 3000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/shoppinglist")) {
    shoppingListRoute(req, res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to the Shopping List API" }));
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
