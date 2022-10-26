const { Router } = require("express");
const router = Router();

router.get("/", (req, res) =>
  res.send(`<h1>Backend CloudMedia</h1>
<p>Bienvenido</p>`)
);
router.use("/updateList", require("./updateList"));

module.exports = router;
