const express = require("express");
const {
  createUsers,
  deleteUser,
  getAllUsers,
  editUser,
  getUserById,
} = require("../controllers/user.controller");
const createUserSchema = require("../schemas/user/createUserSchema");
const deleteUserSchema = require("../schemas/user/deleteUserSchema");
const editUserSchema = require("../schemas/user/editUserSchema");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");
const getByIdSchema = require("../schemas/user/getByIdSchema");
const avatarUpload = require("../middlewares/multer/avatarUpload");
const router = express.Router();

router.post(
  "/",
  avatarUpload,
  validateRequestSchema(createUserSchema),
  createUsers
);
router.get("/", getAllUsers);
router.get("/:id", validateRequestSchema(getByIdSchema), getUserById);
router.delete("/:id", validateRequestSchema(deleteUserSchema), deleteUser);
router.put(
  "/:id",
  avatarUpload,
  validateRequestSchema(editUserSchema),
  editUser
);

module.exports = router;
