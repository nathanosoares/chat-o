import { createContext, ParentComponent, ParentProps } from "solid-js";
import WebApplication from "./app/web-application";

export const AppContext = createContext<WebApplication | null>(null);

type AppProviderPros = { application: WebApplication };

export const AppProvider: ParentComponent<AppProviderPros> = (props: ParentProps<AppProviderPros>) => {
  return <AppContext.Provider value={props.application}>{props.children}</AppContext.Provider>;
};
