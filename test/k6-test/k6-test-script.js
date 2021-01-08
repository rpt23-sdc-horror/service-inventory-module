import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 }, // below normal load
    { duration: "1m", target: 100 },
    { duration: "10s", target: 1400 }, // spike to 1400 users
    { duration: "3m", target: 1400 }, // stay at 1400 for 3 minutes
    { duration: "10s", target: 100 }, // scale down. Recovery stage.
    { duration: "3m", target: 100 },
    { duration: "10s", target: 0 },
  ],
};
export default function () {
  const BASE_URL = "http://54.183.211.7:8000"; // make sure this is not production

  let responses = http.batch([
    [
      "GET",
      `${BASE_URL}/shop/${Math.floor(Math.random() * 9000)}/${Math.floor(
        Math.random() * 7
      )}`,
      null,
      null,
    ],
  ]);

  sleep(2);
}
