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
 *   get:
 *     summary: Find all users
 *     tags: [users]
 *     description: Returns all users
 *     responses:
 *       '200':
 *         description: successful operation
*          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/category'
 *   post:
 *     summary: Create user
 *     tags: [users]
 *     description: This can only be done by the logged in user.
 *     request body:
 *          description: Get all users
 *          content:
 *             application/json:
 *               schema: $ref: #/components/schemas/users
 *             application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/users'
 *             application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/users'
 *            required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/users'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: error of server
 */
router.get("/", getAllUsers);
router.post("/", validateRequestSchema(createUserSchema), createUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Find user by Id
 *     tags: [users]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to return.
 *          schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: #/components/schemas/users
 *       '400':
 *         description: The specified user ID is invalid (not a number).
 *       '404':
 *         description: A user with the specified ID was not found.
 *       '500':
 *         description: error of server.
 *       'default':
 *         description: Unexpected error
 *   put:
 *     summary: Edit user by Id
 *     tags: [users]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to return.
 *          schema:
 *             type: integer
 *             format: int64
 *     requestBody:
 *            description: Update a user by id 
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/users'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/users'
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/users'
 *            required: true
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: #/components/schemas/users
 *       '400':
 *         description: The specified user ID is invalid (not a number).
 *       '404':
 *         description: A user with the specified ID was not found.
 *       '500':
 *         description: error of server.
 *       'default':
 *         description: Unexpected error
 *   delete:
 *     summary: Delete user by Id
 *     tags: [users]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to return.
 *          schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: #/components/schemas/users
 *       '400':
 *         description: The specified user ID is invalid (not a number).
 *       '404':
 *         description: A user with the specified ID was not found.
 *       '500':
 *         description: error of server.
 *       'default':
 *         description: Unexpected error
 */
router.get("/:id", validateRequestSchema(getByIdSchema), getUserById);
router.put("/:id", validateRequestSchema(editUserSchema), editUser);
router.delete("/:id", validateRequestSchema(deleteUserSchema), deleteUser);


module.exports = router;
