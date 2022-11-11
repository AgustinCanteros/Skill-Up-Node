const express = require("express");
const { postCreateCategory, 
        getCategories, 
        getCategoryById, 
        updateCategory,
        deleteCategory } = require("../controllers/categories.controller");

const { validateRequestSchema,
       } = require("../middlewares/validation/validate-schema.middleware");
const { createCategorySchema } = require("../schemas/categories/create.schema");

const router = express.Router();

/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    category:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the category
 *        name:
 *          type: string
 *          description: This is the name of the category      
 * 
 */

/**
 /
* @swagger
* /categories:
*  post:
*    summary: create a new category
*    tags: [categories] 
*    description: Add a new category
*    requestBody:
*            description: Create a new category 
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/category'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID user or ID category
*        '404':
*          description: not Found ID user or ID category
*        '500':
*          description: error of server
*/

router.post("/",
  validateRequestSchema(createCategorySchema),
  postCreateCategory
);

/**
 /
* @swagger
* /categories:
*  get:
*    summary: returns the list of all categories
*    tags: [categories]
*    responses:
*      200:
*         description: the list of categories
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/category'
*/

router.get("/", getCategories);

/**
 /
* @swagger
* /categories/{id}:
*  get:
*    summary: Find category by ID
*    tags: [categories]
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.get("/:id", getCategoryById);

 /**
 /
* @swagger
* /categories/{id}:
*  put:
*    summary:  Update an existing category
*    tags: [categories] 
*    description: Update an existing category by Id
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
*         required: true
*         schema:
*           type: integer
*           format: int64
*    requestBody:
*            description: Update a category 
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/category'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/category'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.put("/:id", updateCategory);

/**
 /
* @swagger
* /categories/{id}:
*  delete:
*    summary:  Delete a category
*    tags: [categories] 
*    description: Delete a category
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to delete
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/category'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/category'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.delete("/:id", deleteCategory);


module.exports = router;
