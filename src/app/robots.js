export default function robots() {
  const baseUrl = "https://gearterssports.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
