## **Angular Frontend Developer Tech Test**

The Bloom & Wild website is primarily an ecommerce site with the product selection page being the starting point for users. From here, users can add multiple products to their basket and continue to payment.

 Using the base Angular 8 application and the mock API provided ([http://localhost:4200/api/products.json](http://localhost:4200/api/products.json)), attempt to complete the user stories below. We will be most impressed by scalable, maintainable and self-explanatory code.

To begin:
-   Clone the repo / start with the given .zip
-   Run `npm install` - To install all the packages required
-   Run `npm run start` - This will start the CLI. Note the “API” is stored in the src/api/ folder
-   To run unit tests using Karma - `npm run test`
    
Please implement as many of the user stories in the following section as you would like and feel free to choose the ones that can show off your frontend development skills. Don’t spend more than two hours on the exercise, and feel free to refactor, re-organise and change any of the previously written code. Please ask us any questions ([tech-hiring@bloomandwild.com](mailto:tech-hiring@bloomandwild.com)) you may have to help you complete any of the stories below.

What we’d like to see:

-   At least one unit test
-   Usage of Angular’s HTTPClient rather than fetch()
    
What we’d love to see:
- More unit tests, especially those that mock the API
- Some kind of CSS naming syntax (BEM or similar)
- A clean, easy to understand solution
- Examples of a Smart vs Dumb component as appropriate
- Using Reactive Form Controls if needed
    

# User Stories:
 The ordering of which these stories could be completed is not important - there is no priority

  
**Displaying products & adding to basket**
-   Display a price for each product using the data from the endpoint [http://localhost:4200/api/products/{Product id}.json](http://localhost:4200/api/products/1.json)
	- Additional: Propose and implement an improved API structure - Files are within `src/api`
-   Display a name and image for each product, using the endpoint above
-   Display the total price for all the products in the basket
-   If multiple of the same product are added to the basket, group by the product, and show a subtotal for that product. Eg `2 x The Harper = £60.00`
-   Delete items from the local basket, and update any prices accordingly
 
**Submitting order to an API**

 -   Submit the basket to POST https://reqres.in/api/basket (A fake API Server):  
   ` {  
    email: {User entered email},  
    products: [  
    {id: {Product ID}, quantity: {Product Quantity} }  
    ]  
    }  `
    Eg:  
    `{  
    email: ‘test[@](mailto:testemail@gmail.com)bloomandwild.com’,  
    products: [  
    {id: 1, quantity: 1}, {id: 2, quantity: 3}  
    ]  
    }`
  
-   On submit, only email addresses that end in @bloomandwild.com, @bloomandwild.de or @bloomandwild.fr are valid. Ideally place a message under the field “Please enter a valid email”
    
**Business Pricing Logic**
-   Subtract £5 off every subsequent product added to basket, so that:  
   ` The Harper = £30  `
    `The Harper (£30) + The Harper (£30 - £5) = £55  `
    `The Harper (£30) + The Harper (£30 - £5) + The Clemmie (£27 - £5) = £82`
    
-   If the user has at least one product in their basket, show a discounted price (£5 off) on the product selection, eg The Harper - ~~£30~~  £25
