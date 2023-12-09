const uuid = require('uuid').v4;

const uuid1 = uuid();
const uuid2 = uuid();
const users = { "Amit": { username: "Amit" }, "Bao": { username: "Bao" }};


const messages = {
    [uuid1]: {
        id: id1,
        sender: "Amit",
        text: "You up?",
    },
    [uuid2]: {
        id: id2,
        sender: "Bao",
        text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    },
};

function addMessage(sender, text) {
    const id = uuid();
    messages[id] = {
      id,
      sender,
      text,
    };
}

module.exports = {
    users,
    messages,
    addMessage,
};