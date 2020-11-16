const app = require("./routes");
const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
