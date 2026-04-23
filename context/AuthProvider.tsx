"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/* Component definition */
function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

/* Export BOTH ways so it works regardless of how layout.tsx imports it:
   import AuthProvider from ...        ← default  ✓
   import { AuthProvider } from ...    ← named    ✓
*/
export { AuthProvider };
export default AuthProvider;