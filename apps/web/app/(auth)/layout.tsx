export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-[100vh] flex justify-center">
      <div className="w-[50%] h-full">{children}</div>
    </div>
  );
}
