import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "BasoBas",
  description: "Platform to find and rent rooms easily",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
