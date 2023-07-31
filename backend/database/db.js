const mongoose = require('mongoose');

const connectDB = async (url) => {
    return await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

 connectDB(process.env.MongoURI).then(()=> {
console.log('Connected to database')
  })
  .catch((err)=> {
    console.log('Error connecting to database',err)
  });