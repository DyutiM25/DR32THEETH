import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
      match: [/^\d{5,6}$/, "Please enter a valid ZIP code"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },
    patientId: {
      type: String,
      unique: true,
      sparse: true, // Only unique for patients
    },
  },
  { timestamps: true }
);


// Helper function to generate a unique 10-digit patient ID
async function generateUniquePatientId() {
    let unique = false;
    let patientId;
    while (!unique) {
        patientId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const existing = await mongoose.models.User.findOne({ patientId });
    if (!existing) unique = true;
  }
  return patientId;
}

// Pre-save hook to generate unique 10-digit patientId for patients
userSchema.pre("save", async function (next) {
    if (this.role === "patient" && !this.patientId) {
        this.patientId = await generateUniquePatientId();
    }
    next();
});

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    // Only hash the password if it’s new or modified
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10); // generate random salt
        this.password = await bcrypt.hash(this.password, salt); // hash password
        next();
    } catch (error) {
        next(error); // pass error to mongoose
    }
});

const User = mongoose.model("User", userSchema);

export default User;
