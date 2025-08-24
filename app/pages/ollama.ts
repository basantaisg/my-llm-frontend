import { NextApiRequest, NextApiResponse } from "next";

type Data = { result: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-coder:6.7b",
        prompt,
      }),
    });

    const data = await response.json();
    res.status(200).json({ result: data.output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "Error connecting to Ollama" });
  }
}
