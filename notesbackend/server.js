const express = require('express');
const cors = require('cors');
require('./database/config')

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
};
app.use(cors(corsOptions));

app.use('/', require('./routes/note.route'))
app.use('/', require('./routes/user.route'))
app.use('/', require('./routes/login.route'))

app.listen(4040, () => {
  console.log(`Server is running on port 4040`);
});
