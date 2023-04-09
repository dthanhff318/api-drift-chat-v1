const { HTTPStatusCode } = require("../constants");
const Friend = require("../models/friends.model");

const friendController = {
  getInfoCommunication: async (req, res) => {
    try {
      const uid = req.infoUser.uid;
      const infoCm = await (
        await Friend.findOne({ uid })
      ).populate({
        path: "listFriend listAccept listRequest listBlock",
        model: "User",
        select: "displayName photoUrl lastActive",
        localField: "uid",
        foreignField: "uid",
      });
      if (infoCm) {
        return res.status(HTTPStatusCode.OK).json(infoCm);
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json("Not found");
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Send request add friend or cancel request
  sendRqAddFriend: async (req, res) => {
    try {
      const senderUid = req.infoUser.uid;
      // Receiver
      const enemy = await Friend.findOne({ uid: req.body.acceptId });
      // Sender
      const me = await Friend.findOne({ uid: senderUid });
      if (!enemy | !me) {
        return res.status(HTTPStatusCode.NOT_FOUND).json("User not found");
      }
      const listEnemyAccept = enemy.listAccept;
      const newListRequest = me.listRequest;
      const indexAccept = listEnemyAccept.indexOf(senderUid);
      const indexReq = newListRequest.indexOf(req.body.acceptId);
      if (indexAccept === -1 && indexReq === -1) {
        listEnemyAccept.push(senderUid);
        newListRequest.push(req.body.acceptId);
        enemy.listAccept = listEnemyAccept;
        me.listRequest = newListRequest;
        await Friend.findOneAndUpdate(
          { uid: req.body.acceptId },
          {
            listAccept: listEnemyAccept,
          }
        );
        const updateListRequest = await Friend.findOneAndUpdate(
          { uid: senderUid },
          {
            listRequest: newListRequest,
          },
          { new: true }
        );
        return res.status(HTTPStatusCode.OK).json(updateListRequest);
      } else {
        listEnemyAccept.splice(indexAccept, 1);
        newListRequest.splice(indexReq, 1);
        enemy.listAccept = listEnemyAccept;
        me.listRequest = newListRequest;
        await Friend.findOneAndUpdate(
          { uid: req.body.acceptId },
          {
            listAccept: listEnemyAccept,
          }
        );
        const updateListRequest = await Friend.findOneAndUpdate(
          { uid: senderUid },
          {
            listRequest: newListRequest,
          },
          { new: true }
        );

        return res.status(HTTPStatusCode.OK).json(updateListRequest);
      }
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  // Accept friend request
  acceptFrRequest: async (req, res) => {
    try {
      const uid = req.infoUser.uid;
      const acceptUid = req.body.acceptUid;
      await Friend.findOneAndUpdate(
        { uid: acceptUid },
        {
          $addToSet: { listFriend: uid },
          $pull: { listRequest: uid },
        }
      );
      const newInfoCm = await Friend.findOneAndUpdate(
        { uid },
        {
          $addToSet: { listFriend: acceptUid },
          $pull: { listAccept: acceptUid },
        },
        { new: true }
      );
      console.log(newInfoCm);
      return res.status(HTTPStatusCode.OK).json(newInfoCm);
    } catch (err) {
      return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = friendController;
