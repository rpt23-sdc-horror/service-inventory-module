import Gateway from "../../../src/gateways/index";
import sinon from "sinon";

describe("Gateway Tests", function () {
  class ThinGateway extends Gateway {}
  const gateway = new ThinGateway();
  const sandbox = sinon.createSandbox();

  before(function () {
    sinon.restore();
    sandbox.spy(gateway);
  });

  after(function () {
    sinon.restore();
  });

  it("should be able to emit a pulse", function () {
    gateway.pulse();
    sinon.assert.calledOnce(gateway.pulse);
  });
});
