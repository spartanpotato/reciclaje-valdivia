import "./globals.css";
import Header from "@/app/components/Header";

// Importamos "Providers": Nos dará acceso a los componentes de Chakra UI
import { Providers } from "@/app/providers/provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Envolvemos todo nuestro contenido */}
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}