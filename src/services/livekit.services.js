const { AccessToken } = require("livekit-server-sdk");
require("dotenv");

const livekitServices = {
  createToken: (data) => {
    const { name, room } = data;
    const participantName = name;
    const at = new AccessToken(
      process.env.LIVE_KIT_API_KEY,
      process.env.LIVE_KIT_SECRET_KEY,
      {
        identity: participantName,
      }
    );
    at.addGrant({ roomJoin: true, room });

    return at.toJwt();
  },
};

module.exports = livekitServices;
