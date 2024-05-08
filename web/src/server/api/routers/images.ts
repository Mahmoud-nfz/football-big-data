import { z } from "zod";
import { load } from "cheerio";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ playerName: z.string().min(1) }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://www.bing.com/images/search?q=${encodeURIComponent(`${input.playerName} full body`)}&qft=+filterui:photo-transparent+filterui:aspect-tall+filterui:imagesize-large&form=IRFLTR&first=1`
      );
      const html = await response.text();
      const $ = load(html);
      const imageElements = $(".mimg").parent().parent().toArray(); // Collect all matching <a> elements into an array

      if (imageElements.length === 0) {
        console.log("No images found for", input.playerName);
        return null;
      }

      // Randomly select one of the first 20 images, or less if there aren't 20
      const randomIndex = Math.floor(Math.random() * Math.min(imageElements.length, 20));
      const imageLink = $(imageElements[randomIndex]).attr("m"); // Get the 'm' attribute from the randomly selected <a> tag
      let imageUrl = imageLink ? JSON.parse(imageLink).murl : null; // Parse the 'm' attribute to extract the 'murl' value

      console.log("High-quality image URL:", imageUrl);

      return imageUrl ? { url: imageUrl } : null;
    }),
});
