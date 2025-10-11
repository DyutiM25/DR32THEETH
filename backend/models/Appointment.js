import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "confirmed", "cancelled", "completed"],
      default: "upcoming",
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      default: 30, // optional: 30 min slots
    },
  },
  { timestamps: true }
);

// Add an index to optimize doctor/date queries
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
