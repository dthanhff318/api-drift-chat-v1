const { HTTPStatusCode } = require("../constants/index")
const Group = require("../models/groups.model")


const groupController =  {
    getAllGroup: async (req,res) => {
        try{
            const uid = req.infoUser.uid;
            const newGroup = await Group.find({members:{$in:[uid]}}).populate({
                path: "members",
                model: "User",
                select: "displayName photoUrl lastActive uid ",
                localField: "uid",
                foreignField: "uid",
              })
              .populate({
                path: "message",
                model: "Message",
                select: "senderId content",
                localField: "group",
                foreignField: "group",
              })
            if(newGroup.length === 0){
                return res.status(HTTPStatusCode.NOT_FOUND).json({message:"no group found"})
            }else{
                return res.status(HTTPStatusCode.OK).json(newGroup)
            }
        }
        catch(err){
            console.log(err);
            return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err)
        }
    }
}

module.exports = groupController