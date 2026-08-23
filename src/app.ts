import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import qs from "qs";
import { auth } from "./lib/auth";
import { categoryRouter } from "./app/modules/category-route/category.router";
import { orderRouter } from "./app/modules/order/order.router";
import { userRouter } from "./app/modules/user/user.router";
import { mealsRouter } from "./app/modules/meals/meals.router";
import { providerApplicationRouter } from "./app/modules/providerApplicationRoute/providerApp.router";
import { providerRouter } from "./app/modules/providers/provider.router";
import { reviewRouter } from "./app/modules/review/review.router";
import { adminRouter } from "./app/modules/admin/admin.router";

const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   PaymentController.handleStripeWebhookEvent,
// );

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.APP_URL!, "https://your-frontend.vercel.app",],
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: [["Content-Type", "Authorization", "Cookie"],
  }),
);

// Bettr auth hander
app.use("/api/auth", toNodeHandler(auth));

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ========================== Connect Routes ==========================
// app.use("/api/v1", IndexRoutes);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/beprovider", providerApplicationRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin", adminRouter);


// Basic route
app.get("/", async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "API is working",
  });
});

// ======================== Global Error Handler / Not Found Handler / Other Middleware ========================
// app.use(globalErrorHandler);
// app.use(notFound);

export default app;

// dont use corn, multer, socket.io etc (scheduler, file uploader, socket)
