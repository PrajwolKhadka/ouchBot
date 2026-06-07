import { RoastRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

export async function POST(req: Request) {
    try{
  const body: RoastRequest = await req.json();
  const toneInstructions = {
    mild: "Respond with generic roast line which sounds funny but is not very offensive.",
    medium:
      "Respond with roast that burn, it needs to sound funny but the offense meter is mid.",
    savage:
      "Respond with no mercy, you can get as offensive as you want but the roast should burn insanely.",
  };

  const prompt = `You are a roast comedian. ${toneInstructions[body.tone]}
    Roast this person based on their appearance.
    ${body.intro ? `They also said this about themselves: "${body.intro}". Use it against them.` : ""}
    Keep it to 3-4 sentences. Be creative and specific.`;
  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: "image/jpeg", data: body.image } },
  ]);
  const text = result.response.text();
  return NextResponse.json({ roast_msg: text, tone: body.tone });
}catch(error){
    return NextResponse.json({error:"Roast Failed!"},{status: 500});
}
}
