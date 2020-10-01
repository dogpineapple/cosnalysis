\c cosnalysis

DROP TABLE IF EXISTS products cascade;
DROP TABLE IF EXISTS ingredients cascade;
DROP TABLE IF EXISTS product_ingredients cascade;
DROP TABLE IF EXISTS properties cascade;
DROP TABLE IF EXISTS ingredient_properties cascade;

CREATE TABLE ingredients (
    ingredient_name text PRIMARY KEY
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    property text,
    UNIQUE(property)
);

CREATE TABLE products (
    product_name text PRIMARY KEY,
    brand_name text NOT NULL,
    product_url text,
    UNIQUE(brand_name, product_name)
);

CREATE TABLE product_ingredients (
    product_name text NOT NULL REFERENCES products,
    ingredient_name text NOT NULL REFERENCES ingredients,
    UNIQUE (product_name, ingredient_name)
);

CREATE TABLE ingredient_properties (
    ingredient_name text REFERENCES ingredients,
    property_id integer REFERENCES properties,
    UNIQUE (ingredient_name, property_id)
);