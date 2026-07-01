import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { CategoryTiles } from "@/components/CategoryTiles";
import { ProductCatalog } from "@/components/ProductCatalog";
import { TechFeatures } from "@/components/TechFeatures";
import { LoyaltyBanner } from "@/components/LoyaltyBanner";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBand />
      <CategoryTiles />
      <ProductCatalog />
      <TechFeatures />
      <LoyaltyBanner />
      <TrustBar />
    </main>
  );
}
