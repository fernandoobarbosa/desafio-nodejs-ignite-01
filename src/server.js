import fastify from "fastify";
import { routes } from "./routes.js";

const app = fastify();
routes(app);
app.listen({ port: 3000 });
