import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "next/cache";

export const GET = async (req, res) => {
  try {
    revalidatePath("/api/prompt");
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
