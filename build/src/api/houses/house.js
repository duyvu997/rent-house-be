"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.HouseSchema = new Mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    completed: Boolean
}, {
    timestamps: true
});
exports.HouseModel = Mongoose.model("house", exports.HouseSchema);
//# sourceMappingURL=house.js.map