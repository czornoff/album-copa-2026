"use strict";
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/album-copa-2026/api/auth">
      {children}
    </SessionProvider>
  );
}
