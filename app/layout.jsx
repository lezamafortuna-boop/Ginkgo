import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://ginkgomx.com"),
  title: {
    default: "GINKGO — Strategic Land Opportunities in Mexico",
    template: "%s | GINKGO",
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
