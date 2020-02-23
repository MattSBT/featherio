function shiftChar(char, shiftCypher) {
  return String.fromCharCode(char.charCodeAt(0) + shiftCypher);
}

module.exports = app => {
  app.post("/api/encode", (req, res) => {
    let shiftCypher = parseInt(req.query.Shift);
    let message = req.query.message;
    cypherMessage = [];
    console.log("hit message");
    //Shifts each char and pushes to array before responding back
    for (let i of message) {
      if (i.includes(" ")) {
        cypherMessage.push(i);
      } else {
        cypherMessage.push(shiftChar(i, shiftCypher));
      }
    }
    cypherMessage = cypherMessage.join("");
    res.send(cypherMessage);
  });
};
