import "./index.css";
import { useEffect, useState } from "react";
import Map from "./Map";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import Join from "../../components/join";
const socket = io.connect("http://localhost:3001");

const Chatit = () => {

  useEffect(() => {
    localStorage.setItem("chatConnected", "true");
  }, []);
  //Room State
  const [room, setRoom] = useState("");
  const history = useNavigate();

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  });
  const handleOnClick = (name) => history(`/chat/${name}`);

  const submitNickname = (name) => {
    socket.emit("user nickname", name);
  };

  let users = ["Nandu", "Sabu"];
  return (
    <div className="mt-3 p-2">
      <Map />
      {/* <Join /> */}
      <div className="flex flex-col cursor-pointer justify-center items-center">
        {users.map((user) => (
          <div
            onClick={() => {
              submitNickname(user);
              handleOnClick(user);
            }}
            className="flex mx-6 my-2 bg-slate-200 px-5 py-4 w-3/4 rounded-3xl drop-shadow-lg shadow"
          >
            <div className="block pr-3">
              <img
                alt="avatar"
                src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                className="rounded-full h-12 w-12 "
              />
            </div>

            <div className="pl-2 text-lg">{user}</div>
            <div> </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatit;
