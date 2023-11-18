const mongoose = require('mongoose');



module.exports = async () => {
    const mongoURI = "mongodb+srv://nituspj032001:815SiszNaLQX7eP6@cluster0.ilrr3bc.mongodb.net/?retryWrites=true&w=majority";


    try {
       const connect = await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}