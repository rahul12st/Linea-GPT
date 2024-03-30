import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/get", async (req, res) => {
  res.status(200).send({
    message: "Hi Rahul Welcome To ChatGPT",
  });
});

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${prompt}`,
      temperature: 1.0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(4000, () =>
  console.log("AI server started on http://localhost:4000")
);
