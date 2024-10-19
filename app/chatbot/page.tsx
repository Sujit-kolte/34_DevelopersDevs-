"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const url =
  "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";

const ChatBot = () => {
  const [text, setText] = useState<string>(""); // specify types
  const [data, setData] = useState<any[]>([]); // specify types

  const submithandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted successfully");
    console.log(text);

    // Add user's question to the chat log
    setData((prevData) => [...prevData, { type: "user", content: text }]);

    let options: any = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "f3e48a6af4mshca58df2fd213e6bp19cf04jsn62c75ef188bf",
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
        model: "gpt-4o",
        max_tokens: 100,
        temperature: 0.9,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const botReply = result.choices[0].message.content;
      console.log(botReply);

      // Add bot's reply to the chat log
      setData((prevData) => [...prevData, { type: "bot", content: botReply }]);

      console.log("successfully answered by chatbot");
    } catch (error) {
      console.log("chatbot unable to reply", error);

      // Add error message to the chat log
      setData((prevData) => [
        ...prevData,
        { type: "bot", content: "Chatbot failed To Answer, Sorry" },
      ]);
    } finally {
      setText(""); // reset the input field
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-start flex-col gap-3 relative p-2">
      <div className="w-full mb-32 h-full flex justify-start items-start overflow-auto flex-col gap-4 no-scrollbar p-4">
        {data.length === 0 && (
          <div className="w-full h-full flex justify-center items-center flex-col font-bold tracking-wider">
            <h1>Provide Your Symptoms Below</h1>
            <h1>Let Me Find Your Solution</h1>
          </div>
        )}
        {data.length !== 0 &&
          data.map((message, index) => {
            return message.type === "user" ? (
              <div
                key={index}
                className="p-2 self-end bg-blue-500 border-2 border-blue-500 text-white rounded-md hover:border-2 hover:border-blue-200">
                <p>{message.content}</p>
              </div>
            ) : (
              <div
                key={index}
                className="p-2 self-start bg-gray-200 rounded-md border-2 border-gray-200 hover:border-black">
                <p>{message.content}</p>
              </div>
            );
          })}
      </div>
      <div className="absolute bg-[#ffffffd8] p-2 top-[100%] w-[90%] left-[50%] translate-x-[-50%] translate-y-[-150%] rounded-xl font-bold tracking-widest">
        <h1 className="w-full flex justify-center items-center text-gray-600 tracking-wide">
          Enter Your Question/Prompt Below
        </h1>
        <form
          onSubmit={submithandler}
          className="w-full relative border-blue-500 p-2 bg-blue-100 rounded-md">
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full bg-transparent border-none outline-none"
          />
          <FaSearch className="absolute left-[100%] text-lg translate-y-[-100%] -translate-x-[150%]" />
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
