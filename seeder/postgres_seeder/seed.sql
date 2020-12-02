COPY products(product_id, style_id, size, quantity)

FROM '/Users/martinsung/Desktop/service-inventory-module/seeder/postgres_seeder/data_generator/seed_data/mockData.csv'

DELIMITER ','

CSV HEADER;

CREATE INDEX product_index ON products (product_id, style_id);
