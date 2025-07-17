import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useChatStore } from "../stores/chatStore.js";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { SendHorizontal } from "lucide-react";

function ChatPage(props) {
  const addMessage = useChatStore((state) => state.addMessage);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { id } = useParams();
  const scrollContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const chatroom = useChatStore((state) =>
    state.chatrooms.find((room) => room.id === id)
  );
  const allMessages = chatroom?.messages || [];
  const totalMessages = allMessages.length;
  const visibleMessages = allMessages.slice(
    Math.max(totalMessages - page * pageSize, 0)
  );

  const handleSubmit = () => {
    if (!input.trim() || !chatroom) return;

    // Add user's message
    addMessage(chatroom.id, "user", input);
    setInput("");
    setIsTyping(true);

    // Simulate Gemini response
    setTimeout(() => {
      addMessage(chatroom.id, "assistant", "This is Gemini's response...");
      setIsTyping(false);
    }, 1200);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!input.trim() || !chatroom) {
      return;
    }
    addMessage(chatroom.id, "user", input);
    setInput("");
    setIsTyping(true);

    // Simulate Gemini response
    setTimeout(() => {
      addMessage(chatroom.id, "assistant", "This is Gemini's response...");
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (container.scrollTop === 0 && page * pageSize < allMessages.length) {
        setPage((prev) => prev + 1); // Load older messages
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [page, allMessages.length]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatroom?.messages.length]);

  if (!chatroom) return <p>Chatroom not found</p>;
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-base-300  w-full border-b border-base-content/10 z-10 ">
        <div className="mx-auto max-w-6xl  p-4">
          <div className="flex items-center justify-between sm:mx-10 md:mx-16 lg:mx-24">
            <div className="flex items-center">
              <img
                src={chatroom?.avatar}
                className="size-9 mr-2"
                alt="avatar"
              />
              <h1 className="text-xl font-bold text-primary font-mono tracking-tight">
                {chatroom?.name}
              </h1>
            </div>

            <div className="items-center flex">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-2 sm:mx-12 md:mx-20 lg:mx-48 xl:mx-72"
      >
        {visibleMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                {msg.role == "user" ? (
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={chatroom?.avatar}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png"
                  />
                )}
              </div>
            </div>
            {/* <div className="chat-header">
          {chatroom?.name}
          <time className="text-xs opacity-50">12:46</time>
        </div> */}
            <div className="chat-bubble">{msg.content}</div>
            {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
          </div>
        ))}

        {isTyping && (
          <div className="chat chat-start">
            <div className="chat-bubble loading">Gemini is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className=" mb-3 mt-1 bottom-4 flex w-full justify-center z-10 ">
        <form action="" className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input bg-base-200 h-12 w-full mx-5 mr-3 sm:w-80 md:w-96 border-gray-400 "
          />
          <button
            type="submit"
            onClick={handleClick}
            className="btn bg-primary w-12 h-12 p-0 flex justify-center items-center"
          >
            <SendHorizontal className="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
