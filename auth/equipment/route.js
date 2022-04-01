const express = require("express");
const router = express.Router();

const { add, login, update, deleteEquipment, getEquipments } = require("../equipment/auth");
const { adminAuth } = require("../../middleware/auth");

router.route("/equip").post(adminAuth,add);

//router.route("/update").put(adminAuth, update);
router.route("/deleteEquipment").delete(adminAuth,deleteEquipment);
router.route("/getEquipments").get(getEquipments);

module.exports = router;