COPY products(product_id, style_id, size, quantity)

FROM 'ABSOLUTE PATH TO YOUR mockData.csv'

DELIMITER ','

CSV HEADER;

CREATE INDEX product_index ON products (product_id, style_id);
