const { Router } = require("express");
const router = Router();

const { clearSheet, setSheet } = require("../controllers/googleApi");
const { getIps } = require("../controllers/routerOs");
const { exc } = require("../controllers/felipe");

const CCRS = [
  //SANTA FE.
  "172.16.9.1",
  //LLANADAS
  "172.30.30.2",
  //ESPINAL
  "172.30.50.2",
  //LIBORINA
  "172.30.40.2",
  //ZONAS
  "172.16.9.2",
  //LH
  "172.30.17.1",
  //FILADELFIA
  "172.30.60.2",
  //SANJE
  "172.30.10.2",
];

/**
 * Update sheet in Google Sheets with data get of Mikrotiks
 */
router.get("/", async (req, res) => {
  let response = [];
  try {
    /**
     * Get all data of Mikrotiks.
     */
    await Promise.all(CCRS.map((ccr) => getIps(ccr))).then((data) => {
      data.forEach((d) => (response = [...response, ...d]));
    });

    /**
     * Clear sheet.
     */
    clearSheet();

    /**
     * Set data in sheet.
     */
    setSheet(response);
    res.json("Process successful.");
  } catch (error) {
    res.status(400).json("error");
  }
});

module.exports = router;
