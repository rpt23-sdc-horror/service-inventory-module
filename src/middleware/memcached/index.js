"use strict";

import Memcached from "memcached-promise";

const memcached = new Memcached("127.0.0.1:11211");

const retrieve = async function (key) {
  try {
    const response = await memcached.get(key);

    return response ? response : undefined;
  } catch (err) {
    console.error(`Memcache Error: ${err}`);

    throw err;
  }
};

const store = async function (key, body, duration) {
  try {
    await memcached.set(key, body, duration * 360);
  } catch (err) {
    console.error(`Memcache Error: ${err}`);

    throw err;
  }
};

export { retrieve, store };
