import PostgresGateway from "../gateways/postgres/index";

export default class Controller {
  constructor() {
    this.gateway = new PostgresGateway();
  }

  async write(document) {
    try {
      const response = await this.gateway.write(document);

      return response;
    } catch (err) {
      this.gateway.logger.log("error", "Error:", err);

      throw err;
    }
  }

  async read(productID, styleID) {
    try {
      const response = await this.gateway.read(productID, styleID);

      return response;
    } catch (err) {
      this.gateway.logger.log("error", "Error:", err);

      throw err;
    }
  }

  async updateQuantity(productID, styleID, size, newQuantity) {
    try {
      const response = await this.gateway.updateQuantity(
        productID,
        styleID,
        size,
        newQuantity
      );

      return response;
    } catch (err) {
      this.gateway.logger.log("error", "Error:", err);

      throw err;
    }
  }

  async delete(productID, styleID, size) {
    try {
      const response = await this.gateway.delete(
        productID,
        styleID,
        size
      );

      return response;
    } catch (err) {
      this.gateway.logger.log("error", "Error:", err);

      throw err;
    }
  }
}
