import { OpenAI } from "openai";

export const OpenAIInstance = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openai;
};

export const OpenAIEmbeddingInstance = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openai;
};
