const messageTypes = {
  USER: "USER",
  COMMON: "COMMON",
};

const actionTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  LEAVE: "LEAVE",
  CHANGE_NAME_GROUP: "CHANGE_NAME_GROUP",
  CHANGE_NICKNAME: "CHANGE_NICKNAME",
  CHANGE_PHOTO_GROUP: "CHANGE_PHOTO_GROUP",
  NONE: "NONE",
};

const listTypeMessage = Object.keys(messageTypes);
const listActionTypeMessage = Object.keys(actionTypes);

module.exports = {
  messageTypes,
  actionTypes,
  listTypeMessage,
  listActionTypeMessage,
};
