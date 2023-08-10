import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const {connection} = await mongoose.connect(`mongodb://0.0.0.0:27017/`,
        {
      dbName: "elearning",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )

    if(connection.readyState == 1){
      isConnected = true;
      console.log('MongoDB connected')
      return Promise.resolve(true)
  }
    
  } catch (error) {
    console.log('MongoDB connection error--', error);
  }
}