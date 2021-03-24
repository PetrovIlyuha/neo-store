import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Michael Brown",
    email: "m.brown@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Barbara Snow",
    email: "m.snow@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
