const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./routes/routes");
app.use("/", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
