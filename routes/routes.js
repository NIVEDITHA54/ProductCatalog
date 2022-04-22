const express = require("express");
const router = express.Router();
const axios = require("axios");

//List products
router.get("/products", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain"
    );
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post Method
router.post("/products", async (req, res) => {
  const data = {
    quantity: req.body.quantity,
    price: req.body.price,
    name: req.body.name,
  };

  console.log(data);
  try {
    await axios.post(
      "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain",
      JSON.stringify(data)
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await axios.delete(
      `https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain/${id}`
    );

    res.send(`Document with id ${id} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update by Id
router.patch("/products/:id", async (req, res) => {
  const updatedData = {
    quantity: req.body.quantity,
    id: req.params.id,
    price: req.body.price,
    name: req.body.name,
  };

  try {
    await axios.post(
      "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain",
      JSON.stringify(updatedData)
    );
    res.send(
      `Document with id ${req.params.id} has been updated successfully..`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
