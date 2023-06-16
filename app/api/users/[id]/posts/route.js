import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: res.params.id }).populate(
      "creator"
    );
    console.log("🚀 ~ file: route.js:12 ~ GET ~ res.params.id:", res.params.id);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to fetch all prompts"), {
      status: 500,
    });
  }
};
