const firebase = require("firebase-admin");
const configFirebaseAdmin = require("../../serviceAccountFirebase.json");

const firebaseAdmin = firebase.initializeApp({
  credential: firebase.credential.cert(configFirebaseAdmin),
});

const pushNotification = (notiConfig) => {
  const { title, body, token } = notiConfig;
  const message = {
    notification: {
      title,
      body,
    },
    data: {
      type: "Income Message",
    },
    token,
  };

  firebaseAdmin
    .messaging()
    .send(message)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

module.exports = pushNotification;
