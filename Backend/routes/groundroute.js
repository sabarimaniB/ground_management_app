const express = require("express");
const router = express.Router();
const { createGround, getAllGrounds,getGroundById } = require("../controllers/groundcontroller");
const auth = require("../middlewares/auth");

router.post("/create", auth, createGround); // ✅ correct now
router.get("/all", getAllGrounds);
router.get("/:ground_id", getGroundById);

module.exports = router; // ✅ export router, not controllers
