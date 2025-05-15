"use client";

import { Provider } from "react-redux";
import { store } from "@/app/state/store";

export default function ClientReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
