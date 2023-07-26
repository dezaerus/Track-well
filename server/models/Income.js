import mongoose from 'mongoose';


const incomeSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  });
  
  const Income = mongoose.model('Income', incomeSchema);
  
  export default Income;