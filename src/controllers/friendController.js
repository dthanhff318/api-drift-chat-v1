const User = require("../models/users.model");
const { HTTPStatusCode } = require("../constants");
const { decodeToken } = require("../utilities/tokenHelper");
const Friend = require("../models/friends.model");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const uid = req.infoUser.uid;
      const infoCm = await Friend.findOne(
        { uid },
        {
          listFriend: 1,
          listRequest: 1,
          listAccept: 1,
          listBlock: 1,
        }
      );
      // Check infoCommunication is created
      if (infoCm) {
        return res.status(HTTPStatusCode.OK).json(infoCm);
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json("Not found");
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      // nguoi duoc gui loi moi
      const enemy = await Friend.findOne({ uid: req.body.acceptId });
      // nguoi gui loi moi
      const me = await Friend.findOne({ uid: req.body.reqId });
      if (!enemy | !me) {
        return res.status(HTTPStatusCode.NOT_FOUND).json("User not found");
      }
      const listEnemyAccept = enemy.listAccept;
      const newListRequest = me.listRequest;
      console.log(listEnemyAccept);
      const indexAccept = listEnemyAccept.indexOf(req.body.reqId);
        const indexReq = newListRequest.indexOf(req.body.acceptId);
      if (indexAccept === -1 && indexReq === -1) {
        listEnemyAccept.push(req.body.reqId);
        newListRequest.push(req.body.acceptId);
        enemy.listAccept = listEnemyAccept;
        me.listRequest = newListRequest;
        await enemy.save();
        await me.save();
        return res
          .status(HTTPStatusCode.OK)
          .json({ listEnemyAccept, newListRequest });
      } else {
          listEnemyAccept.splice(indexAccept, 1);
          newListRequest.splice(indexReq, 1);
          enemy.listAccept = listEnemyAccept;
          me.listRequest = newListRequest;
          await enemy.save();
          await me.save();
          return res.status(HTTPStatusCode.OK).json("da huy yeu cau ket ban !");
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = friendController;
