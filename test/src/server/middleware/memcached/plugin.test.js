import { expect } from "chai";
import Memcached from "memcached";
import sinon from "sinon";
import MemoryCache from "../../../../../src/middleware/memcached/plugin";

describe("Memory Cache Plugin Tests", async function (done) {
  const cache = new MemoryCache();

  after(function () {
    sinon.restore();
  });

  it("should store an item into memory", async function (done) {
    sinon.stub(Memcached.prototype, "del").resolves(true);

    const response = await cache.remove("key");

    expect(response).to.equal(true);

    done();
  });

  done();
});
