import NavbarEN from "@/components/en/NavbarEN";
import FooterEN from "@/components/en/FooterEN";
import FixedCTA from "@/components/FixedCTA";

export default function LayoutEN({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white">
        <NavbarEN />
        {children}
        <FooterEN />
        <FixedCTA />
      </body>
    </html>
  );
}
