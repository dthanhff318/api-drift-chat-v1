const convertBodyFormidable = (object) => {
  const objectData = Object.entries(object);
  return objectData.reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1][0] }), {});
};

module.exports = {
  convertBodyFormidable,
};
