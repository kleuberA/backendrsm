import express from "express";
import cors from "cors";
import { userRoute } from "./routes/user/UserRoute";
import env from "./config/env";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { RouterNotFound } from "../infra/erros/RouterNotFound";
import { postRouter } from "./routes/post/PostRoute";
import { commentRoute } from "./routes/comment/CommentRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 50,
});

app.use(helmet());
app.use(limiter);

app.use("/api/v1", userRoute);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRoute);

app.use((_, res) => {
	res.status(404).send({
		message: new RouterNotFound().message,
		status: "error",
	});
});

app.listen(env.port, () => {
	console.log(`Server listening on port ${env.port}`);
});
