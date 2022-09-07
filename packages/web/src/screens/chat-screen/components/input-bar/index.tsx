import { Component, createSignal, useContext } from "solid-js";
import { AppContext } from "../../../../app/application-context";

const InputBar: Component = () => {
  const app = useContext(AppContext);
  const [message, setMessage] = createSignal<string | undefined>();
  let editableReference: HTMLDivElement | undefined = undefined;

  return (
    <div class="p-4 bg-slate-400 flex shrink-0">
      <div class="grow p-2 rounded bg-white">
        <div
          class="w-full outline-0 max-h-32 overflow-y-scroll whitespace-pre-wrap break-all"
          contentEditable={true}
          role={"textbox"}
          spellcheck={true}
          ref={editableReference}
          onInput={(e) => {
            setMessage(
              [...e.target.childNodes.values()].map((node) => node.textContent).join("\n\r")
            );
          }}
        ></div>
      </div>

      <div class="ml-2 shrink-0 flex justify-center items-center">
        <div
          class="w-8 h-8 text-center rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => {
            const text = message();
            if (text?.trim()) {
              app?.addMessages({
                sender: app?.clientUid || "",
                type: "text",
                body: text?.trim(),
              });
              if (editableReference) editableReference.innerHTML = "";
              setMessage(undefined);
            }
          }}
        >
          📨
        </div>
      </div>
    </div>
  );
};

export default InputBar;
