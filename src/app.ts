import express, { type Express } from "express";

const app: Express = express();


const routes = [
  { 
    endpoint: "/api/user", 
    route: require("./routes/user.route").default,
    middleware: [express.json()] 
  },
];

routes.forEach(({ endpoint, route, middleware }) => {
  app.use(endpoint,...middleware, route);
});


export default app;
