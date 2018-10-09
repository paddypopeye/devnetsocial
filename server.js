const express =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DataBase Config
const db = require('./config/keys').mongoUri;

//connect to mongoDB
mongoose
    .connect(db)
    .then(()=> console.log('Connected to the DB'))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.send('Hello World'));//end app.get

//Use Routes
app.use('/api/users',users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on ${port}`));

