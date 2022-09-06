import { PacketManager } from "@chat-o/common";
import { Component, onCleanup, onMount } from "solid-js";
import { AppContext } from "./app/application-context";
import WebApplication from "./app/web-application";
import ChatScreen from "./screens/chat-screen";

const App: Component = () => {
  const app = new WebApplication(new PacketManager());

  onMount(() => {
    app.bootstrap();
  });

  onCleanup(() => {});

  return (
    <AppContext.Provider value={app}>
      <ChatScreen />
    </AppContext.Provider>
  );
};

export default App;
