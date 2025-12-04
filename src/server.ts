import app from "./app";
import { PORT } from "./config/env";


app.use("/healthCheck", (request, response) => {
  response.status(200).send("13 is alive and well!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check at http://localhost:${PORT}/healthCheck`);
}); 


