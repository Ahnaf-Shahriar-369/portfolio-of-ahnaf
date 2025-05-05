
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#000000] h-[9000px]`}
      >
        {children}

        
      </body>
    </html>
  );
}
