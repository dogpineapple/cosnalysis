const express = require("express");
const router = express.Router();

router.post("/analyze", function (req, res, next) {
  return res.json(`analyzing...${req.body.product1}`);
});


module.exports = router;