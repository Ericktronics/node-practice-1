import express, { type Express } from "express";
import { auth } from "./middlewares/auth";
import { requestLogger } from "./middlewares/requestLogger";

const app: Express = express();

const routes = [
  {
    endpoint: "/api/user",
    route: require("./routes/user.route").default,
    middleware: [express.json(), requestLogger, auth],
  },
  {
    endpoint: "/api/auth",
    route: require("./routes/auth.route").default,
    middleware: [express.json(), requestLogger],
  },
];

routes.forEach(({ endpoint, route, middleware }) => {
  app.use(endpoint, ...middleware, route);
});

export default app;
