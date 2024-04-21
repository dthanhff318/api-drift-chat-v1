const convertBodyFormidable = (object) => {
  const objectData = Object.entries(object);
  return objectData.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1][0] }), {});
};

const getNameAndAvatarChat = (group, currentUserId) => {
  if (group?.isGroup) {
    return {
      nameGroup: group.name,
      avatarGroup: group.photo,
    };
  } else {
    const friend = group?.members?.find((e) => e.id !== currentUserId) ?? {};
    return {
      nameGroup: friend.displayName,
      avatarGroup: friend.photoUrl,
    };
  }
};

module.exports = {
  convertBodyFormidable,
  getNameAndAvatarChat,
};
