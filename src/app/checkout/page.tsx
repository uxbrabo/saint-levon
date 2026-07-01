import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — SAINT LEVON",
  description: "Finalize sua compra SAINT LEVON.",
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
