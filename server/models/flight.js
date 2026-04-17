const alertSchema = new mongoose.Schema({
  userId: String,
  origin: String,
  destination: String,
  targetPrice: Number
});
