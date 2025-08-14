"use client";

import { ToastProvider } from "@/components/ui/toast-manager";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <Provider store={store}>
//       <ToastProvider>{children}</ToastProvider>
//     </Provider>
//   );
// }

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  );
}
