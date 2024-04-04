import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors(
  {
    origin: "https://linea-gpt.vercel.app",
    methods: ["POST","GET"],
    credentials: true
  }
));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the AI server!");
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
 // res.setHeader("Access-Control-Allow-Origin", "https://linea-gpt.vercel.app");
     
 //    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
 //    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error || "Something went wrong");
  }
});
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log("AI server started")
);


