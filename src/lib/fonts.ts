import { Playfair_Display, Inter, Frank_Ruhl_Libre, Heebo } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700"],
  variable: "--font-frank-ruhl",
  display: "swap",
});

export const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500"],
  variable: "--font-heebo",
  display: "swap",
});
