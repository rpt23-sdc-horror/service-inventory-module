DROP DATABASE IF EXISTS inventory;

CREATE DATABASE inventory;

\c inventory;

CREATE TABLE products (
  product_id varchar(50000) NOT NULL,
  style_id varchar(50000) NOT NULL,
  size numeric NOT NULL,
  quantity integer NOT NULL
)