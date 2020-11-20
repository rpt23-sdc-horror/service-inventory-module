CREATE DATABASE inventory

CREATE TABLE IF NOT EXISTS products (
  product_id varchar(250) NOT NULL,
  style_id varchar(250) NOT NULL,
  size numeric NOT NULL,
  quantity integer NOT NULL
)
