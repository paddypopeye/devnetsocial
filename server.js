const express =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path'); 
//initialize express app
const app = express();

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//DataBase Config
const db = require('./config/keys').mongoUri;

//Connect to mongoDB
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=> console.log('Connected to the DB'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users',users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Static assets for production

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('mern-client/build'))
}//end if 
else {
    
app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'mern-client', 'Build', 'index.html'));
    })//end get() 
}//end else

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`));