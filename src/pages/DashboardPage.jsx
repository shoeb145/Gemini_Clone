import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../stores/chatStore";
import { Navigate, useNavigate } from "react-router";

function DashboardPage(props) {
  const [chatName, setChatName] = useState("");
  const addChatroom = useChatStore((state) => state.addChatroom);
  const chatrooms = useChatStore((state) => state.chatrooms);
  const deleteChatroom = useChatStore((state) => state.deleteChatroom);
  // const resetChatrooms = useChatStore((state) => state.resetChatrooms);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatName.trim()) {
      return toast.error("chat name can not be blank");
    }
    const randomId = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${randomId}`;
    // localStorage.removeItem("chat-storage");
    // resetChatrooms();
    addChatroom(chatName, avatar);
    document.getElementById("my_modal_3")?.close();

    setChatName("");
  };
  const deleteChat = (id, name) => {
    if (confirm("Are you sure you want to delete this chatroom?")) {
      deleteChatroom(id);
    }
    toast.success(`${name} is deleted`);
  };
  const handleClick = (id) => {
    navigate(`chat/${id}`);
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-3 items-center mx-4">
        <h2 className="font-serif stat-title text-xl ">Wellcome back! 🎉</h2>

        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          {" "}
          <Plus />
          Chat
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Create chat room</h3>
            <form onSubmit={handleSubmit} className="form-control py-3">
              <div className="flex flex-col justify-center items-center ">
                <label>
                  <span className="mr-20">Chat Room Name </span>
                </label>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => {
                    setChatName(e.target.value);
                  }}
                  className="input input-bordered mt-2 h-8"
                />
              </div>
              <div className="flex justify-center items-center mt-4">
                <button type="submit" className="btn btn-primary w-20 ">
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="w-full h-fit">
        {chatrooms &&
          chatrooms
            .slice()
            .reverse()
            .map((chatroom) => (
              <div
                key={chatroom.id}
                className="h-14 mx-3 rounded-xl bg-base-200 mt-3 flex justify-between items-center"
                onClick={() => handleClick(chatroom.id)}
              >
                <div className="flex items-center">
                  <img
                    src={chatroom?.avatar}
                    className="size-9 mx-3"
                    alt="avatar"
                  />
                  <p className="text-lg font-medium">{chatroom.name}</p>
                </div>
                <Trash2
                  className="mr-3"
                  onClick={() => deleteChat(chatroom.id, chatroom.name)}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default DashboardPage;
