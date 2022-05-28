const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/mongoModel')

module.exports = {

    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password, address, mobile_no } = req.body

            if (!firstName || !lastName || !email || !password || !address || !mobile_no) {
                return res.send('Please fill your  without empty space all details')
            }
            const find = await User.findOne({ email })
            if (find) {
                return res.json({ "response": "User already exists" })
            }
            const salt = await bcrypt.genSalt(10)
            let secPass = await bcrypt.hash(password, salt)
            const data = { firstName, lastName, email, secPass, address, mobile_no }
            const user = await User.create(data)
            let a = await user.save()
            const jwtUser = await User.findOne({ email })
            const jwt_id = jwtUser._id
            const token = await jwt.sign({ _id: jwt_id }, process.env.JWT_SECRET_KEY)
            res.json({ "status": 200, "response": "Registered", "token": token })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.send("Fill all detail")
            }
            const user = await User.findOne({ email })
            const pass = user.secPass

            const ismatch = await bcrypt.compareSync(password, pass)//
            if (ismatch) {
                const jwtUser = await User.findOne({ email })
                const jwt_id = jwtUser._id
                const token = await jwt.sign({ _id: jwt_id }, process.env.JWT_SECRET_KEY)
                return res.json({ "response": "Logged in successfully ", "token": token })
            }
            else {
                return res.send("Sorry No data found. you need to register first ")
            }
        }
        catch (err) {
            res.send({ err: err.message })
        }
    },
    all: async (req, res) => {
        try {
            const user = await User.find().select("-secPass")
            res.json({ "status": "200", "response": user })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    singleUser: async (req, res) => {
        try {
            const id = req.params.id
            const user = await User.findOne({ _id: id })
            console.log(user)
            if (!user) {
                return res.send("User Don't exists")
            }
            res.json({ "status": 200, "response": user })
        } catch (error) {
            res.json({ error: error })
        }
    },
    singleuserall: async (req, res) => {
        try {
            const { firstName, lastName, email, mobile_no } = req.params

            const user = await User.find({ firstName });
            const user1 = await User.find({ lastName });
            const user2 = await User.find({ email });
            const user3 = await User.find({ mobile_no });
            // const user4 = await User.find({ address });

            if (!user) {//|| !user4
                return res.send("User with this first name does not exist")
            } else if (!user1) {
                return res.send("User with this last name does not exist")
            } else if (!user2) {
                return res.send("User with this email does not")
            } else if (!user3) {
                return res.send("User with this mobile_no does not")
            } else {
                console.log("User exists")
            }
            res.json({ "status": 200, "response": user })
        } catch (err) {
            res.send({ err: err.message })
        }
    },
    deleteById: async (req, res) => {
        try {
            const id = req.params.id


            const user = await User.findByIdAndDelete(id)

            if (!user) {
                return res.send("User Don't exists")
            }

            res.json({ "deleted user": "User deleted" })

        } catch (err) {
            res.send({ error: err.message })

        }

    },
    update: async (req, res) => {
        try {
            const newUpdate = req.body
            const user = await User.findByIdAndUpdate(req.params, newUpdate, {
                new: true
                //  it will fill the empty data field while updating
            })
            if (!user) {
                return res.send("User Don't exists")
            }
            // const update = user.save(newUpdate)
            res.json({ "Updated user  response": user })

        } catch (err) {
            res.send({ error: err })

        }

    }

}