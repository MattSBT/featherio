const fs = require("fs");

function shiftChar(char, shiftCypher, { alphaOnly = false } = {}) {
  // this will look to see if alphaOnly has been set to true if so the cypher will only be Alpha Chars
  return String.fromCharCode(char.charCodeAt(0) + shiftCypher);
}

function createCypherMessage(message, cypher) {
  let tempCypherMessage = [];

  //Looks for base cases or Shifts each char and pushes to array before responding back
  if (message.length <= 1) {
    tempCypherMessage = shiftChar(message, cypher);
  } else if (cypher === 0) {
    tempCypherMessage = message;
  } else {
    for (let i of message) {
      if (i.includes(" ")) {
        tempCypherMessage.push(i);
      } else {
        tempCypherMessage.push(shiftChar(i, cypher));
      }
    }
    tempCypherMessage = tempCypherMessage.join("");
  }
  return tempCypherMessage;
}

module.exports = app => {
  app.post("/api/encode", (req, res) => {
    let shiftCypher = parseInt(req.query.Shift);
    let message = req.query.Message;
    if (
      !shiftCypher ||
      message === "" ||
      typeof shiftCypher !== "number" ||
      typeof message !== "string"
    ) {
      res.status(500).send("");
    } else {
      let cypherMessage = createCypherMessage(message, shiftCypher);

      // Append to file on server
      fs.appendFile("cypherMessage.txt", cypherMessage + "\n", error => {
        if (error) throw error;
      });
      //Handle sending the correct headers and either cyphered message or blank string
      cypherMessage = { EncodedMessage: cypherMessage };
      cyperMessage = JSON.stringify(cypherMessage);
      res.status(200).send(cypherMessage);
    }
  });
};
