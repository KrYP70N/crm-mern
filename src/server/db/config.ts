const mongoose = require('mongoose')

const connectDB = async () : Promise<void> => {
  try {
    const connect : any = await mongoose.connect(process.env.DB_STR)
    console.log(`Mongo DB connected ${connect.connection.host}`)
  } catch (error) {
    process.exit(1)
  }
}

export default connectDB
