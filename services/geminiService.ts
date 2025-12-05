// Pre-defined list of encouraging messages specifically for Subject 2
const messages = [
  "小娜，相信自己，你就是最棒的！倒车入库一把过，侧方停车如神助！🚗💨",
  "稳住心态，离合踩好，今天你就是考场车神！🏆",
  "深呼吸！所有的练习都不会白费，科目二必过！🌟",
  "把车当成大玩具，离合稳一点，看点准一点，驾照向你招手！💯",
  "别紧张，就像平时练车一样，压好离合，慢就是快！🐢",
  "侧方停车记得打灯，出库不压线，满分拿下！✨",
  "半坡起步不要慌，给点油门更有劲，小娜冲鸭！🦆",
  "曲线行驶看车头，后视镜里找感觉，你可以的！👀",
  "考试就是走过场，心态决定一切，你是最棒的司机！🌈",
  "今天的天气都在为你加油，科目二，拿来吧你！🎉"
];

export const generateEncouragement = async (mood: string = 'funny'): Promise<string> => {
  // Simulate a small network delay for effect (optional, can be removed for instant response)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};