import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "next/cache";
import User from "@models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    revalidatePath("/api/prompt");
    const response = new Response(JSON.stringify(prompts), { status: 200 });
    const url = new URL(request.url);
    url.searchParams.set("t", Date.now());
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Location", url.toString());
    return response;
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
