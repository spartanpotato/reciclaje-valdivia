import "./globals.css";
import Header from "@/app/components/Header";

import { Providers } from "@/app/providers/provider";
import { UserRoleProvider } from "@/app/providers/userRole";

export const metadata = {
  title: "Reciclaje en Valdivia",
  description: "Puntos de reciclaje en valdivia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <UserRoleProvider>
            <Header />
            {children}
          </UserRoleProvider>
        </Providers>
      </body>
    </html>
  );
}
