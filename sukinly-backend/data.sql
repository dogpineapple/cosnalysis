\c cosnalysis

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS product_ingredients;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS ingredient_properties;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS product_types;


CREATE TABLE products (
    product_name text PRIMARY KEY,
    brand integer NOT NULL REFERENCES brands,
    product_type text NOT NULL REFERENCES product_types
);

CREATE TABLE ingredients (
    ingredient_name text PRIMARY KEY
);

CREATE TABLE product_ingredients (
    product_name text NOT NULL REFERENCES products,
    ingredient_name text NOT NULL REFERENCES ingredients,
    UNIQUE (product_name, ingredient_name)
);

CREATE TABLE properties (
    property text PRIMARY KEY,
    property_details text DEFAULT ""
);

CREATE TABLE ingredient_properties (
    ingredient_name text REFERENCES ingredients,
    property text REFERENCES properties,
    UNIQUE (ingredient_name, property)
);

CREATE TABLE brands (
    brand_name text PRIMARY KEY
);

CREATE TABLE product_types (
    product_type text PRIMARY KEY
);