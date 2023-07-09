const express = require("express");
const { getUser } = require("../controllers/user");
const { updateUser } = require("../controllers/user");

const verify_auth = require("../middleware/verify_auth");
const router = express.Router();

router.get("/:id", verify_auth, getUser);
router.put("/:id", verify_auth, updateUser);

module.exports = router;
