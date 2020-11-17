import Gateway from "../index";
import { Pool } from "pg";
import VAULT from "../../../vault/dev.json";

export default class PostgresGateway extends Gateway {
  constructor() {
    super("PostgresGateway");

    const { user, host, database, password, port } = VAULT;

    this.pool = new Pool({
      user,
      host,
      database,
      password,
      port,
    });
  }

  async write(datum) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const { product_id, style_id, size, quantity } = datum;
      const queryText =
        "INSERT INTO products (product_id, style_id, size, quantity) VALUES ($1, $2, $3, $4) RETURNING product_id";
      const response = await client.query(queryText, [
        JSON.stringify(`${product_id}`),
        JSON.stringify(`${style_id}`),
        size,
        quantity,
      ]);

      await client.query("COMMIT");

      return response;
    } catch (err) {
      // Use winston to record errors.
      await this.logger.log("error", err.message, err);
      await client.query("ROLLBACK");

      throw err;
    } finally {
      client.release();
    }
  }

  async read(productID, styleID) {
    // Since the product ID and style ID are stored as strings, they must be stringified before they can be used as query parameters.
    const client = await this.pool.connect();
    const pID = JSON.stringify(`${productID}`);
    const sID = JSON.stringify(`${styleID}`);

    try {
      await client.query("BEGIN");

      const queryText =
        "SELECT * FROM products WHERE product_id = $1 AND style_id = $2";
      const response = await client.query(queryText, [pID, sID]);

      await client.query("COMMIT");

      return response;
    } catch (err) {
      await this.logger.log("error", err.message, err);
      await client.query("ROLLBACK");

      throw err;
    } finally {
      client.release();
    }
  }

  async updateQuantity(productID, styleID, size, quantity) {
    const client = await this.pool.connect();
    const pID = JSON.stringify(`${productID}`);
    const sID = JSON.stringify(`${styleID}`);

    try {
      await client.query("BEGIN");

      const queryText =
        `UPDATE products SET quantity = $1 WHERE product_id = $2 AND style_id = $3 AND size = $4 RETURNING product_id, style_id, size`;
      const response = await client.query(queryText, [
        quantity,
        pID,
        sID,
        size,
      ]);

      return response;
    } catch (err) {
      await this.logger.log("error", err.message, err);
      await client.query("ROLLBACK");

      throw err;
    } finally {
      client.release();
    }
  }

  async delete(productID, styleID, size) {
    const client = await this.pool.connect();
    const pID = JSON.stringify(`${productID}`);
    const sID = JSON.stringify(`${styleID}`);

    try {
      await client.query("BEGIN");

      const queryText =
        "DELETE FROM products WHERE product_id = $1 AND style_id = $2 AND size = $3 RETURNING product_id, style_id";
      const response = await client.query(queryText, [
        pID,
        sID,
        size,
      ]);

      return response;
    } catch (err) {
      await this.logger.log("error", err.message, err);
      await client.query("ROLLBACK");

      throw err;
    } finally {
      client.release();
    }
  }
}
