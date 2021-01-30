let mongoose = require("mongoose")
let s = new mongoose.Schema({
    guild:{
        type: String,
        required: true
    },
    prefixs:{
        type: Array,
        default: []
    },
    tags:{
        type: Array,
        default: []
    }
})
module.exports = mongoose.model("Guilds", s)