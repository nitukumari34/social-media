const express = require("express");
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');

const authRouter = require('./routers/authRouter');
const postsRouter=require('./routers/postsRouter');
const morgan = require("morgan");

dotenv.config('./.env');

const app = express();

// middleware
app.use(express.json());
app.use(morgan("common"))


app.use('/auth', authRouter);

app.use("/posts",postsRouter);



app.get('/',(req,res)=>{
res.status(200).send('OK');
})

const PORT = process.env.PORT || 5003;

dbConnect();


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);

});