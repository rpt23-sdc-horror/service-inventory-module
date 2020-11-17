import Gateway from "../gateway";
import { Pool, PoolClient, QueryResult } from "pg";
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
      const queryText = `INSERT INTO products (product_id, style_id, size, quantity) VALUES ($1, $2, $3, $4) RETURNING product_id`;
      const response = await client.query(queryText, [
        product_id,
        style_id,
        size,
        quantity,
      ]);

      await client.query("COMMIT");

      return response;
    } catch (err) {
      await client.query("ROLLBACK");

      this.logger.log("error", `${err.message}`);

      throw err;
    } finally {
      client.release();
    }
  }
}
