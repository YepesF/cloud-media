const server = require("./src/app.js");
require("dotenv").config();
const db = require("./src/models");

const port = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`App listening at ${port}`); // eslint-disable-line no-console
  });
});
