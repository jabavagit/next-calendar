import '../styles/globals.css';

export const metadata = {
    title: 'Calendar Dashboard',
    description: 'Manage your monthly calendars and events efficiently.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}