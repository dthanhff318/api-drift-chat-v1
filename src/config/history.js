const historyActionTypes = {
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  VISIT: "VISIT",
};

const listHistoryActionTypes = Object.keys(historyActionTypes);

module.exports = {
  historyActionTypes,
  listHistoryActionTypes,
};
