CREATE DATABASE inventory

CREATE TABLE IF NOT EXISTS products (
  product_id varchar(250) NOT NULL,
  style_id varchar(250) NOT NULL,
  size integer NOT NULL,
  quantity integer NOT NULL
  PRIMARY KEY (product_id)
)