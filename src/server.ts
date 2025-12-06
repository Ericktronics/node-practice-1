import app from "./app";
import { PORT } from "./config/env";
import { logger } from "./config/logger";


app.use("/healthCheck", (request, response) => {
  response.status(200).send("13 is alive and well!");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Health check at http://localhost:${PORT}/healthCheck`);
}); 


