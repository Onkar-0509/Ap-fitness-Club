import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },  // Corrected 'createAt' to 'createdAt'
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
