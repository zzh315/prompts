import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

import User from "@models/user";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find().populate({ path: "creator" });

    const response = new Response(JSON.stringify(prompts), { status: 200 });

    // Add a unique identifier to the URL to force a cache-busting reload

    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
