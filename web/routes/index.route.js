const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index.ejs", {
      ip: `http://localhost:8006`,
      endpoints: [
          {
              method: "POST",
              endpoint: "order",
              desc: "Endpoint to place order"
          }
      ]
  });
});

module.exports = route;
