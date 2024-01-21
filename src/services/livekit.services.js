const { AccessToken } = require("livekit-server-sdk");
require("dotenv");

const livekitServices = {
  createToken: (data) => {
    const { name, room } = data;
    // identifier to be used for participant.
    // it's available as LocalParticipant.identity with livekit-client SDK
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
