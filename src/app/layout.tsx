import '../styles/globals.css';
import ConnectionListener from "@/components/ConnectionListener";

export const metadata = {
    title: "Calendar Dashboard",
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#2563eb" />
            </head>
            <body>
                <ConnectionListener />
                {children}
            </body>
        </html>
    );
}