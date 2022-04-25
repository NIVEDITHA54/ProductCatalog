const express = require("express");
const router = express.Router();
const axios = require("axios");
const Retry = require("../helper/retry");

//List products "Request failed with status code 500"
router.get("/products", (req, res) => {
  const retryRequests = new Retry(
    "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain"
  );

  retryRequests
    .retryGet()
    .then((data) => res.send(data))
    .catch((error) => console.error);
});

//Post Method "Request failed with status code 500"
router.post("/products", (req, res) => {
  const data = {
    quantity: req.body.quantity,
    price: req.body.price,
    name: req.body.name,
  };
  const retryRequests = new Retry(
    "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain"
  );
  retryRequests
    .retryPost(JSON.stringify(data))
    .then(res.status(200).json(data))
    .catch(console.error);
});

//Delete by ID Method
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const retryRequests = new Retry(
    `https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain/${id}`
  );

  retryRequests
    .retryDelete()
    .then(res.send(`Document with id ${id} has been deleted..`))
    .catch((error) => console.error);
});

//Update by Id
router.patch("/products/:id", async (req, res) => {
  const updatedData = {
    quantity: req.body.quantity,
    id: req.params.id,
    price: req.body.price,
    name: req.body.name,
  };

  let isFound = false;
  const retryRequests = new Retry(
    "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain",
    `${req.params.id}`
  );
  try {
    await retryRequests.retryGet();
    isFound = true;
    console.log(`Document with id ${req.params.id} is present..`);
  } catch (err) {
    console.error;
  }
  console.log(isFound);
  if (isFound) {
    retryRequests
      .retryPost(updatedData)
      .then((res) =>
        res.send(
          `Document with id ${req.params.id} has been updated successfully..`
        )
      )
      .catch((error) => console.error);
  }
});

module.exports = router;
