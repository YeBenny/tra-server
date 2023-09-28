var express = require("express");
var router = express.Router();

var appId = "vmESwj27uvU5Rl7HbJ1d2o45sxg7DH4UE1g6o8zs";
var appSecret = "MAPQBU7uyBdy16nU4mivCNPwAFmAz8pmADNz8gcYgc";
var state = "bennyye";

var hash256 = function (string) {
  const { createHash } = require("crypto");
  return createHash("sha256").update(string).digest("hex");
};

var hmacSha256 = function (string, appSecret) {
  const { createHmac } = require("crypto");
  return createHmac("sha256", appSecret).update(string).digest("hex");
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST context token. */
router.post("/get-token-context", function (req, res, next) {
  const json = {
    appId: appId,
    state: state,
  };
  const body = JSON.stringify(json);
  const bodyHash = hash256(body);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = hmacSha256(bodyHash + timestamp, appSecret);

  res.json({
    errcode: 0,
    errmsg: "success",
    data: {
      timestamp: timestamp,
      appId: appId,
      state: state,
      signature: signature,
    },
  });
});

module.exports = router;
