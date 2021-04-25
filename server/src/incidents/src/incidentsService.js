import app from "./incidentsApp";
import { closeDriverConnection } from "./db/database";

const PORT = process.env.INCIDENTS_SERVICE_PORT;

app.listen(PORT, (_req, _res) => {
  console.log(`listening on port: ${PORT}`);
});

closeDriverConnection();
