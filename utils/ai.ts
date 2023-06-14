import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import z from 'zod';

const schema = z.object({
  mood: z.string().describe('The mood of the person who wrote the journal entry.'),
  summary: z.string().describe('Quick summary of the entire entry.'),
  subject: z.string().describe('The subject of the entry.'),
  negative: z.boolean().describe('Whether the entry is negative. (e.g. "I had a bad day" would be negative, "I had a good day" would be positive)'),
  color: z.string().describe('A hexidecimal color code that represents the mood of the entry. (e.g. #FF0000 for red, #00FF00 for green, #0000FF for blue)'),
  emoji: z.string().describe('An emoji that represents the mood of the entry. (e.g. 😃 for happy, 😢 for sad, 😡 for angry)'),
});

const parser = StructuredOutputParser.fromZodSchema(schema);

const getPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatInstructions}n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formatInstructions }
  });

  const input = await prompt.format({ entry: content });


  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.error(e);
  }
};