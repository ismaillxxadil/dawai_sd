import FAQSection from "@/ui/FAQSection";
import HeroSection from "@/ui/HeroSection";
import WhyDawaiSection from "@/ui/WhyDawaiSection";

export default function page() {
  return (
    <div className="text-3xl text-primary ">
      <HeroSection />
      <WhyDawaiSection />
      <FAQSection />
    </div>
  );
}
