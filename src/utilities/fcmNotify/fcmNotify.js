const firebase = require("firebase-admin");
const configFirebaseAdmin = require("../../serviceAccountFirebase.json");

const firebaseAdmin = firebase.initializeApp({
  credential: firebase.credential.cert(configFirebaseAdmin),
});

const pushNotification = () => {
  const message = {
    notification: {
      title: "Title from server",
      body: "Body of your notification",
    },
    token:
      "fi4wDdokHLxqtjP4bG5J8R:APA91bHkbd4FkeLTY9Jof0-sJfszzbZvT0kicRfJEnGTm4uY_6l8SKqAvd1Vm-rL6xMEpr239Ykvu8NXo7GGhltQ8cta0gZqV0gaVoiADHKoa30qUhl6nh3_UkbnLqTckYwnOOcwGzl5",
  };

  firebaseAdmin
    .messaging()
    .send(message)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

module.exports = pushNotification;
