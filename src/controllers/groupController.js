const { HTTPStatusCode } = require("../constants/index")
const Group = require("../models/groups.model")


const groupController =  {
    getAllGroup: async (req,res) => {
        try{
            const uid = req.infoUser.uid;
            console.log(uid);
            const newGroup = await Group.find({members:{$in:[uid]}}
            //     ,(err,groups) => 
            // {
            //     if(err){
            //         console.log(err);
            //         return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({message:"INTERNAL_SERVER_ERROR"})
            //     }else if(groups.length === 0){
            //         return res.status(HTTPStatusCode.NOT_FOUND).json({message:"no group found"})
            //     }else{
            //         return res.status(HTTPStatusCode.OK).json(groups)
            //     }
            // }
            )
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