const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// replace keywords with emojis and pushes to messages
exports.emojify =
  functions.database.ref("/messages/{pushId}/text").onWrite((event) => {
    // !event.data.val() is a deleted event
    // event.data.previous.val() is a modified event
    if (!event.data.val() || event.data.previous.val()) {
      console.log("not a new write event");
      return;
    }

    // Get the value from the 'text' key of the message
    const original = event.data.val();
    const emojiText = emojifyText(original);

    // Return a JavaScript Promise to update the database node
    return event.data.ref.set(emojiText);
  });

/**
  * Replacing with the regular expression /.../ig does a case-insensitive
  * search (i flag) for all occurrences (g flag) in the string
  * @param {string} text: original text
  * @return {string} text with keywords replaced by emoji
*/
function emojifyText(text) {
  let emojiText = text;
  emojiText = emojiText.replace(/\blol\b/ig, "😂");
  emojiText = emojiText.replace(/\bcat\b/ig, "😸");
  return emojiText;
}
