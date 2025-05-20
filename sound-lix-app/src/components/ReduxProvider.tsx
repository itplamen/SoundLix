"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/state/store";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
