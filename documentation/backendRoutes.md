## Users
* POST /user => Allow users to create an account
* GET /users/:id => Allows the access of one user's information
* GET /users/login => Allows an user to login
* PUT /users/:id => Allows an user to change their information

## Products
* GET /products => Get all products containing category,list
* GET /products/:id => Get a single product in detail
* GET /products/promotion/:promotion => Get products in a certain % of discount
* GET /products/promotion/:category/:promotion => Get products on sale based on list
* DELETE /products/:id => Allows a user to delete one of product out of shopping cart or their favorite list items

## Category
* GET /category => Get all items belongs to one catergory


## ProductList
* GET /productlist/:productListName => Get all items belonged to one certain list
