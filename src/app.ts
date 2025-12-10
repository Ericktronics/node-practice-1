import express, {
  type Express,
  type Router,
  type RequestHandler,
} from "express";
import { auth } from "./middlewares/auth";
import { requestLogger } from "./middlewares/requestLogger";
import { refreshToken } from "./middlewares/refreshToken";
import { permission } from "./middlewares/permissionChecker";

interface RouteConfig {
  endpoint: string;
  route: Router;
  middleware: RequestHandler[];
}

const app: Express = express();

const routes: RouteConfig[] = [
  {
    endpoint: "/api/projectMember",
    route: require("./routes/projectMember.route").default,
    middleware: [express.json(), requestLogger, auth, refreshToken, permission],
  },
  {
    endpoint: "/api/project",
    route: require("./routes/project.route").default,
    middleware: [express.json(), requestLogger, auth, refreshToken, permission],
  },
  {
    endpoint: "/api/user",
    route: require("./routes/user.route").default,
    middleware: [express.json(), requestLogger, auth, refreshToken, permission],
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
