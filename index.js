import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/products.js'


const app = express();


app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use('/product', postRoutes);

//Test
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })


const CONNECTION_URL = 'mongodb+srv://allenp:mbits1111@cluster0.ip2ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT  = process.env.PORT||5010;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology: true})
        .then(()=> app.listen(PORT, ()=>console.log(`server running on ${PORT}`)))
        .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false);

