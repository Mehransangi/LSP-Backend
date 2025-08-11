import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }
})

export default mongoose.model('Location', locationSchema)