var username = "";
var connection = new WebSocket("ws://localhost:8000");

function connect() {
    if (document.getElementById("username") == "") {
        console.log("enter a username");
        return;
    }

    username = document.getElementById("username").value;

    var msg = {
        type: "connect",
        text: username,
        date: Date.now()
    };

    try {
        connection.send(JSON.stringify(msg));
    } catch (error) {
        console.log("m8 you are not connected yet");
    }
}

function sendMessage() {
    if (username == "") {
        console.log("enter a username and connect to the server");
        return;
    }

    var msg = {
        type: "message",
        text: document.getElementById("message").value,
        username: username,
        date: Date.now()
    };

    connection.send(JSON.stringify(msg));
}

connection.onopen = function () {
    console.log("connection opened");
};

connection.onerror = function (error) {
    console.log(error);
};

connection.onmessage = function (message) {
    // assume that message is in JSON format
    var json = JSON.parse(message.data);

    // only continue if message is from server
    if (json.origin != "server") {
        return;
    }

    console.log(json.text);
};