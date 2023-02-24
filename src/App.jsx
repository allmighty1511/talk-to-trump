// Create a react component that inputs a textarea message then performs a fetch request to localhost 3001 gets back a response as a data.message and displays that message on a box below

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [awaitingAnswer, setAwaitingAnswer] = useState(true);
  const [responseObtained, setResponseObtained] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    setAwaitingAnswer(false);
    setResponseObtained(true);

    event.preventDefault();
    fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.message);
      });
  };

  return (
    <div className="App grid grid-cols-2">
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580128660010-fd027e1e587a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9uYWxkJTIwdHJ1bXB8ZW58MHx8MHx8&w=1000&q=80')",
          backgroundPosition: "top",
          height: "100vh",
        }}
      >
        &nbsp;
      </div>
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        {awaitingAnswer && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <label className="font-semibold text-xl text-left text-red">
              Talk to trump
            </label>
            <textarea
              className="border my-5 border-1 border-gray outline-none rounded-md p-1"
              value={message}
              onChange={handleChange}
              cols="40"
              rows={5}
            />

            <div>
              <input
                type="submit"
                value="Submit"
                className="bg-gray gray hover:cursor-pointer py-2 px-5 border border-1 border-gray rounded-lg"
              />
            </div>
          </form>
        )}
        {responseObtained && response.length == 0 && (
          <div className="flex items-center justify-center">
            <img
              style={{ width: "6rem" }}
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
              alt="Loading Gif"
            />
          </div>
        )}
        {responseObtained && response.length > 0 && (
          <>
            <div
              className="flex justify-start items-start px-10 mx-10 py-2 rounded-lg text-white"
              style={{ border: "solid 1px gray", background: "blue" }}
            >
              <p>
                <span className="font-semibold">Donald Trump</span> <br />
                {response}
              </p>
            </div>
            <button
              className="mt-4 rounded-lg py-2 px-4 active:bg-blue active:text-white hover:bg-lightblue"
              style={{ border: "solid 1px gray" }}
              onClick={() => {
                setAwaitingAnswer(true);
                setResponseObtained(false);
                setResponse("");
              }}
            >
              Enviar otra consulta
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
