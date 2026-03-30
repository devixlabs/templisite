const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(sitemap, {
    hostname: "https://templisite.devixlabs.com",
  });

  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/api");

  // Image optimization shortcode
  eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
    if(alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./dist/assets/images/",
      urlPath: "/assets/images/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Date filter
  eleventyConfig.addFilter("date", function(date, format = "YYYY-MM-DD") {
    return new Date(date).toLocaleDateString();
  });

  // Current year filter
  eleventyConfig.addFilter("currentYear", function() {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
