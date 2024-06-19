const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    rol: { type: String, required: true, enum:["admin", "user"], default: "user" }
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const User = mongoose.model('users', userSchema, "users")
module.exports = User