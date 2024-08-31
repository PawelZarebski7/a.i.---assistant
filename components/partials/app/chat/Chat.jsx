import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileChatSidebar, infoToggle } from "./store";
import useWidth from "@/hooks/useWidth";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import axios from 'axios';

const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];

const time = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return hours12 + ":" + minutesStr + " " + ampm;
};

const Chat = () => {
  const { activechat, openinfo, mobileChatSidebar, user } =
    useSelector((state) => state.chat);
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log('User in Chat component:', user);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        content: message.trim(),
        sender: "me",
        img: "/assets/images/users/user-1.jpg",
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage("");
      setIsLoading(true);

      try {
        console.log('Sending message with user ID:', user.id);
        const response = await axios.post('/api/chat', {
          messages: [...messages, newMessage],
          userId: user.id
        });
        console.log('Response from server:', response.data);
        setMessages(prevMessages => [...prevMessages, { sender: 'them', content: response.data.content }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { sender: 'them', content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie później.' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const chatheight = useRef(null);
  useEffect(() => {
    if (chatheight.current) {
      chatheight.current.scrollTop = chatheight.current.scrollHeight;
    }
    console.log('Current messages:', messages);
  }, [messages]);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (user?.id) {
        try {
          console.log('Loading chat history for user ID:', user.id);
          const response = await axios.get(`/api/chat/history/${user.id}`);
          if (Array.isArray(response.data.chatHistory)) {
            setMessages(response.data.chatHistory);
          } else {
            console.error('Chat history is not an array:', response.data.chatHistory);
            setMessages([]);
          }
        } catch (error) {
          console.error('Error loading chat history:', error);
          setMessages([]);
        }
      }
    };

    loadChatHistory();
  }, [user?.id]);

  return (
    <div className="h-full">
      <header className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex py-6 md:px-6 px-3 items-center">
          <div className="flex-1">
            <div className="flex space-x-3 rtl:space-x-reverse">
              {width <= breakpoints.lg && (
                <span
                  onClick={() => dispatch(toggleMobileChatSidebar(true))}
                  className="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3"
                >
                  <Icon icon="heroicons-outline:menu-alt-1" />
                </span>
              )}
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full relative">
                  <span className={`status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0 ${user.status === "active" ? "bg-success-500" : "bg-secondary-500"}`}></span>
                  <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <div className="flex-1 text-start">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate">
                  {user.fullName}
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                  Active now
                </span>
              </div>
            </div>
          </div>
          <div className="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse">
            {/* <div className="msg-action-btn">
              <Icon icon="heroicons-outline:phone" />
            </div>
            <div className="msg-action-btn">
              <Icon icon="heroicons-outline:video-camera" />
            </div>
            <div onClick={() => dispatch(infoToggle(!openinfo))} className="msg-action-btn">
              <Icon icon="heroicons-outline:dots-horizontal" />
            </div> */}
          </div>
        </div>
      </header>
      <div className="chat-content parent-height">
        <div
          className="msgs overflow-y-auto msg-height pt-6 space-y-6"
          ref={chatheight}
        >
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((item, i) => (
              <div className="block md:px-6 px-4" key={i}>
                {item.sender === "them" && (
                  <div className="flex space-x-2 items-start group rtl:space-x-reverse">
                    <div className="flex-none">
                      <div className="h-8 w-8 rounded-full">
                        <img
                          src="/assets/images/users/ai-avatar.jpg"
                          alt=""
                          className="block w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex space-x-4 rtl:space-x-reverse">
                      <div>
                        <div className="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all">
                          {item.content}
                        </div>
                        <span className="font-normal text-xs text-slate-400 dark:text-slate-400">
                          {time()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {item.sender === "me" && (
                  <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse">
                    <div className="no flex space-x-4 rtl:space-x-reverse">
                      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                        <Dropdown
                          classMenuItems=" w-[100px] left-0 top-0  "
                          items={chatAction}
                          label={
                            <div className="h-8 w-8 bg-slate-300 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full text-slate-900">
                              <Icon icon="heroicons-outline:dots-horizontal" />
                            </div>
                          }
                        />
                      </div>
                      <div className="whitespace-pre-wrap break-all">
                        <div className="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1">
                          {item.content}
                        </div>
                        <span className="font-normal text-xs text-slate-400">
                          {time()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="h-8 w-8 rounded-full">
                        <img
                          src={item.img}
                          alt=""
                          className="block w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4">Rozpocznij rozmowę z FRODO A.I.</div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
      <footer className="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700">
        <div className="flex-none sm:flex hidden md:space-x-3 space-x-1 rtl:space-x-reverse">
          <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
            <Icon icon="heroicons-outline:link" />
          </div>
          <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
            <Icon icon="heroicons-outline:emoji-happy" />
          </div>
        </div>
        <form
          className="flex-1 relative flex space-x-3 rtl:space-x-reverse"
          onSubmit={handleSendMessage}
        >
          <div className="flex-1">
            <textarea
              type="text"
              value={message}
              placeholder="Zadaj pytanie..."
              className="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              disabled={isLoading}
            />
          </div>
          <div className="flex-none md:pr-0 pr-3">
            <button 
              className="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
              disabled={isLoading}
            >
              <Icon
                icon="heroicons-outline:paper-airplane"
                className="transform rotate-[60deg]"
              />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;