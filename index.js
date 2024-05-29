import OpenAI from "openai";
import dotenv from "dotenv";
import chalk from "chalk";
import readlineSync from "readline-sync";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.clear();

console.log(
  chalk.green(`


    #    ###     #####                      
   # #    #     #     # #    #   ##   ##### 
  #   #   #     #       #    #  #  #    #   
 #     #  #     #       ###### #    #   #   
 #######  #     #       #    # ######   #   
 #     #  #     #     # #    # #    #   #   
 #     # ###     #####  #    # #    #   #   
                                            

 `)
);

const messages = [];

while (true) {
  const userContent = readlineSync.question(chalk.cyan("User:"));

  if (userContent.toLocaleLowerCase() === "exit") {
    console.log(chalk.yellow("AI: ") + " Bye!");
    break;
  }

  const userMessage = { role: "user", content: userContent };
  messages.push(userMessage);

  const aiResponse = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-4o",
  });

  const aiMessage = aiResponse.choices[0].message;
  console.log(aiMessage);
}
