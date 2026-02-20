import { Frank_Ruhl_Libre } from "next/font/google";

// Latin companion for FrankRuehl AAA (Hebrew-only local font)
export const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-frank-ruhl-libre",
  display: "swap",
});
