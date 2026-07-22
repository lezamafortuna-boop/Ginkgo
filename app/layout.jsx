import NavbarES from "@/components/NavbarES";
import Footer from "@/components/Footer";
import FixedCTA from "@/components/FixedCTA";

export default function LayoutES({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#0D0D0D] text-white">
        <NavbarES />
        {children}
        <Footer />
        <FixedCTA />
      </body>
    </html>
  );
}
