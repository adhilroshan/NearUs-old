import io from "socket.io-client";
const ws = io.connect("http://localhost:8081");;

export default ws;
