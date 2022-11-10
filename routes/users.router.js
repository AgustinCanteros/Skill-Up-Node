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
const router = express.Router();

/**
 * @swagger
 * /users:
 *   tags:
 *   -User
 *   get:
 *     summary: Find all users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *          $ref: #/definitions/users
 *     security:
 *     - api_key: []
 *   post:
 *     summary: Create user
 *     description: This can only be done by the logged in user.
 *     parameters:
 *     - name: body
 *        in: body
 *        required: true
 *        description: Created user object
 *        required: true
 *        schema:
 *         $ref: #/definitions/users
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *          $ref: #/definitions/users
 *       400:
 *         description: Bad Request
 */
router.get("/", getAllUsers);
router.post("/", validateRequestSchema(createUserSchema), createUsers);

/**
 * @swagger
 * /users/{userId}:
 *   tags:
 *   -User
 *   get:
 *     summary: Find user by Id
 *     parameters:
 *     - name: userId
 *        in: path
 *        required: true
 *        description: ID of user to return.
 *        schema:
 *           type: integer
 *        example: 1
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: #/definitions/users
 *       400:
 *         description: The specified user ID is invalid (not a number).
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 *     security:
 *     - api_key: []
 *   put:
 *     summary: Edit user by Id
 *     parameters:
 *     - name: userId
 *        in: path
 *        required: true
 *        description: ID of user to return.
 *        schema:
 *           type: integer
 *        example: 1
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: #/definitions/users
 *       400:
 *         description: The specified user ID is invalid (not a number).
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 *     security:
 *     - api_key: []
 *   delete:
 *     summary: Delete user by Id
 *     parameters:
 *     - name: userId
 *        in: path
 *        required: true
 *        description: ID of user to return.
 *        schema:
 *           type: integer
 *        example: 1
 *     responses:
 *       200:
 *         description: successful operation
 *         schema:
 *           $ref: #/definitions/users
 *       400:
 *         description: The specified user ID is invalid (not a number).
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 *     security:
 *     - api_key: []
 */
router.get("/:id", validateRequestSchema(getByIdSchema), getUserById);
router.put("/:id", validateRequestSchema(editUserSchema), editUser);
router.delete("/:id", validateRequestSchema(deleteUserSchema), deleteUser);


module.exports = router;
