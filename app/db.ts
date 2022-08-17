import mongoose from "mongoose";

export default mongoose.createConnection("mongodb://appscodeathome.ovh:27017/task", {
    auth: {
        password: "%code_2022!_mongo%",
        username: "code_at_home"
    }
})