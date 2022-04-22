require('dotenv').config();

const port = process.env.PORT;

function connect(app) {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

module.exports = { connect };
