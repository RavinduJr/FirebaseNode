const express = require("express");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { SUCCESS, INTERNAL_SERVER_ERROR } = require("../utils/constants");

const router = express.Router();

router.post("/add-car", async (req, res, next) => {
  const db = getFirestore();
  const reqBody = req.body;
  const cBrand = reqBody.cBrand;
  const cYear = reqBody.cYear;
  const cName = reqBody.cName;
  const docBody = { cBrand: cBrand, cYear: cYear, cName: cName };
  try {
    const collectionRef = await db.collection("cars").add(docBody);
    const result = { docId: collectionRef.id, isSuccess: true };
    res.status(SUCCESS).send(result);
  } catch (error) {
    const result = { isSuccess: false };
    res.status(INTERNAL_SERVER_ERROR).send(result);
  }
});

module.exports = router;
