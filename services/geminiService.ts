import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateEncouragement = async (mood: string = 'funny'): Promise<string> => {
  const ai = getClient();
  
  if (!ai) {
    return "小娜，相信自己，你就是最棒的！倒车入库一把过，侧方停车如神助！🚗💨";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a super supportive best friend cheering up "Li Xiaona" (李小娜) for her Driving Test Subject 2 (科目二).
      
      Write a short, punchy, and warm encouraging message (max 40 words) in Chinese.
      
      Include specific references to Subject 2 challenges to make it real, such as:
      - Controlling the clutch (离合)
      - Watching the points (看点位)
      - Not crossing the lines (不压线)
      - Reverse parking (倒库)
      
      Tone: Enthusiastic, confident, slightly humorous or cute. Use emojis.
      Example vibe: "Xiaona! Just treat the car like a big toy. Clutch steady, eyes sharp, pass is yours! 💯"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text?.trim() || "李小娜，稳住心态，离合踩好，今天你就是考场车神！🏆";
  } catch (error) {
    console.error("Error generating encouragement:", error);
    return "李小娜，深呼吸！所有的练习都不会白费，科目二必过！🌟";
  }
};