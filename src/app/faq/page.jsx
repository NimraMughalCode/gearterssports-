import FAQs from "@/components/FAQ";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Got questions? Find answers about custom orders, size charts, shipping, and manufacturing policies from the best manufacturer of sports accessories and gloves.",
  keywords: [
    "best manufacturers of gloves",
    "best manufacturer of sports",
    "gearters sports faq",
    "custom sports accessories order FAQ",
    "boxing glove sizes FAQ"
  ],
  alternates: {
    canonical: "/faq",
  },
};

export default function Page() {
  return (
    <>
      {/* Other page content */}
      <FAQs />
    </>
  );
}