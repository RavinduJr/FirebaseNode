const shopController = require("./controllers/shop");
const adminController = require("./controllers/admin");
const express = require("express");
const { initializeApp, cert, getApps } = require("firebase-admin/app");

const serviceAccount = require("../config/signin-b78dc-firebase-adminsdk-7dv2v-1441f1cfcc.json");
const { ADMIN, SHOP } = require("./utils/constants");

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const app = express();

app.use(ADMIN, adminController);
app.use(SHOP, shopController);

module.exports = app;
