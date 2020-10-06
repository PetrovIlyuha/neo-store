import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    console.log(
      `MongoDB Cluster connected: ${conn.connection.host}`.blue.underline
    )
  } catch (err) {
    console.error(
      `Error connection MONGO cluster: ${err.message}`.red.underline.bold
    )
    process.exit(1)
  }
}

export default connectDB
