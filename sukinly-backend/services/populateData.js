const scrapeSkinCarisma = require("./skinCarismaWebScraper");
const Product = require("../models/product");
const IngredientProperty = require("../models/ingredientProperties");
const ProductIngredient = require("../models/productIngredients");
const Ingredient = require("../models/ingredient");

const START_PAGE = 6;
const END_PAGE = 15;


async function populateDB() {
  let products = await scrapeSkinCarisma(START_PAGE, END_PAGE);

  // iterate over products and create a database entry for each 
  /* product: {
       productName
       brandName
       productUrl
       ingredients: [{
         ingredientName:
         ingredientFunctions:
       }]
      } */
  products.forEach(async (product) => {
    try {

      await Product.add(product.productName, product.brandName, product.productUrl);

      if (product.ingredients) {
        await Ingredient.add(product.ingredients);

        product.ingredients.forEach(async (ingredient) => {
          if (ingredient.ingredientFunctions.length > 0) {
            await IngredientProperty.addIngredientProperty(ingredient.ingredientName, ingredient.ingredientFunctions);
          };
        });

        await ProductIngredient.addProductIngredients(product.productName, product.ingredients);
      }

    } catch (err) {
      console.log("err", err);
    }
  });

  return "Successfully added";
}

populateDB().then((result) => console.log(result));
