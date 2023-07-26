import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import expensesRoutes from "./routes/expenses.js";
import incomeRoutes from "./routes/income.js";


/* CONFIGURATIONS */

dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

/* ROUTES  */

app.use("/auth", authRoutes);
app.use("/expenses", expensesRoutes);
app.use("/income", incomeRoutes);

/* MONGOOSE SETUP */

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
