import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      chatrooms: [],

      addChatroom: (name, avatar) =>
        set((state) => ({
          chatrooms: [
            ...state.chatrooms,
            {
              id: Date.now().toString(),
              name,
              avatar, // full URL
              messages: [],
            },
          ],
        })),

      deleteChatroom: (id) =>
        set((state) => ({
          chatrooms: state.chatrooms.filter((chat) => chat.id !== id),
        })),

      addMessage: (chatroomId, role, content) =>
        set((state) => ({
          chatrooms: state.chatrooms.map((chat) =>
            chat.id === chatroomId
              ? {
                  ...chat,
                  messages: [...chat.messages, { role, content }],
                }
              : chat
          ),
        })),
      resetChatrooms: () =>
        set(() => ({
          chatrooms: [],
        })),
    }),
    {
      name: "chat-storage", // LocalStorage key
    }
  )
);
