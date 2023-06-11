import "@styles/globals.css";

export const metadata = {
  title: "OnlyPrompts",
  description: "Discover&Share the best AI prompts from around the web.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
};
export default RootLayout;
