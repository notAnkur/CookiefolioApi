const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index.ejs", {
    ip: `https://api.cookiefolio.ankuranant.dev`,
    endpoints: [
      {
        method: 'POST',
        endpoint: 'auth/signup',
        isRouteProtected: false,
        desc: 'Endpoint for user signup',
        reqBody: 'string username, string password, string address',
        response: 'bool isOpSuccess, string username, string message'
      },
      {
        method: 'POST',
        endpoint: 'auth/login',
        isRouteProtected: false,
        desc: 'Endpoint for login',
        reqBody: 'string username, string password',
        response: 'jwt_token_string token, object userProfile: {string username, string address}, bool isOpSuccess, string message'
      },
      {
        method: "GET",
        endpoint: "order",
        isRouteProtected: true,
        desc: "Endpoint to fetch all orders",
        reqBody: "None",
        response: "bool isOpSuccess, string message, array orders: [string _id, string username, string address, Number cookieQuantity, string deliveryStatus, string assignedTo, dateString placedOn]"
      },
      {
        method: "GET",
        endpoint: "order/pending",
        isRouteProtected: true,
        desc: "Endpoint to fetch all pending orders",
        reqBody: "None",
        response: "bool isOpSuccess, string message, array orders: [string _id, string username, string address, Number cookieQuantity, string deliveryStatus, string assignedTo, dateString placedOn]"
      },
      {
        method: "POST",
        endpoint: "order",
        isRouteProtected: true,
        desc: "Endpoint to place new order",
        reqBody: "username, address, cookieQuantity",
        response: "bool isOpSuccess, string message, object order: {string deliveryStatus, string _id, string username, string address, int cookieQuantity, dateString placedOn, string assignedTo}"
      },
      {
        method: "GET",
        endpoint: "order/me",
        isRouteProtected: true,
        desc: "Endpoint to fetch user\'s unfinished orders",
        reqBody: "None",
        response: "bool isOpSuccess, string message, array order: [string deliveryStatus, string _id, string username, string address, int cookieQuantity, dateString placedOn, string assignedTo]"
      },
      {
        method: "GET",
        endpoint: "order/me/all",
        isRouteProtected: true,
        desc: "Endpoint to fetch all of user\'s orders",
        reqBody: "None",
        response: "bool isOpSuccess, string message, array order: {string deliveryStatus, string _id, string username, string address, int cookieQuantity, dateString placedOn, string assignedTo}"
      },
      {
        method: "GET",
        endpoint: "delivery",
        isRouteProtected: true,
        desc: "Endpoint to fetch all delivery drivers",
        reqBody: "None",
        response: "bool isOpSuccess, string message, array deliveryPeople: {array assignedOrderId, string _id, string username, bool isAvailable}"
      },
      {
        method: "POST",
        endpoint: "delivery",
        isRouteProtected: true,
        desc: "Order finished endpoint",
        reqBody: "string deliveryPersonId",
        response: "bool isOpSuccess, string message, object delivery: {array assignedOrderId, string _id, string username, bool isAvailable}"
      }
    ]
  });
});

module.exports = route;
