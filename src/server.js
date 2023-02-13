const express = require("express");
const app = express();
app.use(express.json())


app.get("/",  async (req, res) => {
  res.json({ message: 'hello' })
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on http://localhost:4000");
});
