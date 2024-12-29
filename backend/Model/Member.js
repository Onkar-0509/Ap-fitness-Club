import mongoose from "mongoose";

const MemberSchema = mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10}$/, 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPayment: { type: Number, required: true }, 
    deposit: { type: Number, required: true }, 
});

const Member = mongoose.model("Member", MemberSchema);

export default Member;
