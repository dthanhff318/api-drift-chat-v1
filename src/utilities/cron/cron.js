const cron = require("node-cron");
const User = require("../../models/users.model");

// Run every 1 hour
const bonusDriftCoin = cron.schedule("0 0 */1 * * *", async () => {
  await User.updateMany(
    {},
    {
      $inc: { coin: 2 },
    }
  );
});

const starCrons = () => {
  bonusDriftCoin.start();
};

module.exports = starCrons;
