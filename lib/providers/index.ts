import { OpenAIProvider } from "./openai";
import { GeminiProvider } from "./gemini";
import { ClaudeProvider } from "./claude";

export const providers = {
  openai: new OpenAIProvider(),
  gemini: new GeminiProvider(),
  claude: new ClaudeProvider(),
};