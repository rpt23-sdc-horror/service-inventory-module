import Memcached from "memcached";

require("dotenv").config();

export default class MemoryCache {
  constructor() {
    const host = process.env.CACHE_HOST || "localhost";

    this.cache = new Memcached(`${host}:11211`);
  }

  remove(key) {
    const cache = this.cache;

    return new Promise(function (resolve, reject) {
      cache.del(key, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}
