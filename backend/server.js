import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
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

// Cookie-parser Middleware

app.use(cookieParser());
/*
Cookie-parser
 - app.use(...): This is how you add middleware in an Express app. Middleware functions have access to the req, res, and next objects and are used to process requests.

 - cookieParser(): This is a middleware function provided by the cookie-parser package. It parses the Cookie header from incoming HTTP requests and populates req.cookies with an object containing all cookie key-value pairs.
*/

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
