const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchemaObject = {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zip: { type: String, trim: true },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  }

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


