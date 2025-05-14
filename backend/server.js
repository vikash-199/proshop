import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json()); //This middleware parses incoming JSON data in the request body and makes it available as a JavaScript object in req.body.
app.use(express.urlencoded({ extended: true })); //This middleware parses URL-encoded data (like form submissions using <form>) and also puts it into req.body.

/*
In modern apps, it's common to use both, especially when:

You accept both JSON requests (from frontend or API clients)

And form submissions (from classic HTML forms)
*/

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
