const fs = require("fs");

function shiftChar(char, shiftCypher, { alphaOnly = false } = {}) {
  // this will look to see if alphaOnly has been set to true if so the cypher will only be Alpha Chars
  if (!alphaOnly) {
    return String.fromCharCode(char.charCodeAt(0) + shiftCypher);
  } else {
    let currentChar = char.charCodeAt(0);
    if (currentChar > 122 || currentChar < 65) {
      currentChar = 65;
    }
  }
}

module.exports = app => {
  app.post("/api/encode", (req, res) => {
    let shiftCypher = parseInt(req.query.Shift);
    let message = req.query.message;
    if (!shiftCypher || !message) {
      res.status(500).send("");
    } else {
      cypherMessage = [];

      //Shifts each char and pushes to array before responding back
      for (let i of message) {
        if (i.includes(" ")) {
          cypherMessage.push(i);
        } else {
          cypherMessage.push(shiftChar(i, shiftCypher));
        }
      }
      cypherMessage = cypherMessage.join("");

      // Append to file on server
      fs.appendFile("cypherMessage.txt", cypherMessage, error => {
        if (error) throw error;
      });
      //Handle sending the correct headers and either cyphered message or blank string
      cypherMessage = { EncodedMessage: cypherMessage };
      cyperMessage = JSON.stringify(cypherMessage);
      res.status(200).send(cypherMessage);
    }
  });
};
