const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const pinRoute = require('./routes/pins');

dotenv.config(); //configuring dotenv

app.use(express.json());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

app.use('/api/users', userRoute);
app.use('/api/pins', pinRoute);

////////////////////////////////////////////////

const __currentDirectory = path.resolve();
// console.log(__currentDirectory);
app.use(express.static(path.join(__currentDirectory, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__currentDirectory, '/frontend/build/index.html'))
);

////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}!`);
});
