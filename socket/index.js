const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
    console.log(users);
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

io.on("connection", (socket) => {
    //when a user connected
    console.log("user connected");
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and receive message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })


    //When a user Disconnected
    socket.on("disconnect", () => {
        console.log("a user disconnect");
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

