import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // link ảnh
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

export default mongoose.model("Product", productSchema);
