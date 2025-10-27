const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchemaObject = {
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    default: '',
  },
  profile_Picture: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    zip: { type: String, trim: true, default: '' },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  // Health & fitness metrics
  age: {
    type: Number,
    min: 0,
    default: 0,
  },
  height: {
    type: Number, // in cm
    min: 0,
    default: 0,
  },
  weight: {
    type: Number, // in kg
    min: 0,
    default: 0,
  },
  goalWeight: {
    type: Number, // in kg
    min: 0,
    default: 0,
  },
  bodyFat: {
    type: Number, // %
    min: 0,
    max: 100,
    default: 0,
  },
  BMI: {
    type: Number,
    min: 0,
    default: 0,
  },

  // Fitness & lifestyle goals
  primaryGoal: {
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Recomposition'],
    default: 'Weight Loss',
  },
  targetDate: {
    type: Date,
    default: null, // or new Date() if you want to pre-fill with current date
  },
  weeklyWorkouts: {
    type: Number,
    min: 0,
    default: 0,
  },
  dailyCalories: {
    type: Number,
    min: 0,
    default: 0,
  },
  sleepTarget: {
    type: Number,
    min: 0,
    max: 24,
    default: 8,
  },
  waterIntake: {
    type: Number, // in liters
    min: 0,
    default: 2,
  },
};


  const userSchema = new mongoose.Schema(userSchemaObject, {timestamps: true});

  // MongoDB hook
  userSchema.pre("save", async function () {
    try {
        const salt = await bcrypt.genSalt(10); // Extra added security on top of your password hash
        const cipherTextPassword = await bcrypt.hash(this.password, salt);
        this.password = cipherTextPassword;
    } catch (err) {
        console.log("ERROR WHILE HASINHG PASSWORD", err)
    }
});


  const userModel = mongoose.model("users", userSchema);

  module.exports = userModel;


