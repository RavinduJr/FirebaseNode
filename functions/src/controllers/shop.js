const express = require("express");
const { getFirestore } = require("firebase-admin/firestore");
const { SUCCESS, INTERNAL_SERVER_ERROR, CARS } = require("../utils/constants");
const router = express.Router();

router.get("/get-cars", async (req, res, next) => {
    const db = getFirestore()
    const cars = []
    const carsDocuments = await db.collection(CARS).get()
    try {
        carsDocuments.forEach(car => {
            const carData = car.data()
            cars.push(carData)
        })
        const result = {cars: cars}
        res.status(SUCCESS).send(result)
    } catch (error) {
        const result = {}
        res.status(INTERNAL_SERVER_ERROR).send(result)
    }
});

module.exports = router;
