const express = require("express");
const router = express.Router();
const axios = require("axios");
const Retry = require("../helper/retry");

// List products
router.get("/products", (req, res) => {
  const retryRequests = new Retry(
    "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain"
  );

  retryRequests
    .retryGet()
    .then((data) => res.status(200).send(data))
    .catch((error) =>
      res.status(error.response.status).json({ message: error.message })
    );
});

//Add new product
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
    .then(res.status(201).json(data))
    .catch((error) =>
      res.status(error.response.status).json({ message: error.message })
    );
});

//Update product by id
router.patch("/products/:id", (req, res) => {
  const updatedData = {
    quantity: req.body.quantity,
    id: req.params.id,
    price: req.body.price,
    name: req.body.name,
  };
  const retryRequests = new Retry(
    "https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain",
    `${req.params.id}`
  );
  retryRequests
    .retryGet()
    .then((data) => {
      console.log(`Document with id ${req.params.id} is present.`);
      retryRequests
        .retryPost(updatedData)
        .then((data) => {
          console.log(data);
          res
            .status(200)
            .send(`Document with id ${req.params.id} is updated successfully.`);
        })
        .catch((error) =>
          res.status(error.response.status).json({ message: error.message })
        );
    })
    .catch((error) =>
      res.status(error.response.status).json({ message: error.message })
    );
});

//Delete product by id
router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const retryRequests = new Retry(
    `https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain/${id}`
  );

  retryRequests
    .retryDelete()
    .then((data) =>
      res.status(200).send(`Document with id ${id} is deleted successfuly.`)
    )
    .catch((error) =>
      res.status(error.response.status).json({ message: error.message })
    );
});

module.exports = router;
