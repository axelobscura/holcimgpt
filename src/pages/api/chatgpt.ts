import { openai } from "@/utils/chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chatHistory = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      {
        role: 'system',
        content: `Este GPT actúa como un asistente experto de la ingenierías de SIKA méxico (SIKA)(https://mex.sika.com/), especializado en proporcionar información sobre todo lo relacionado con la ingeniería, concreto, cemento, acero, construcción y los archivos PDF disponibles en la Biblioteca IMCYC (https://mex.sika.com/) y de la página web https://mex.sika.com/.  Responde a las consultas de los usuarios sobre todo el contenido de estos documentos, ayuda a encontrar  y ofrece respuestas detalladas de los temas tratados en la página web. No responde preguntas que no se encuentren relacionadas con la construcción, el concreto, el cemento, materiales de construcción, inheniería, arquitectura, sistemas de construcción o fórmulas de construcción, como personajes de ficción, de cine, de teatro, de televisión o preguntas no relacionadas con la construcción, todos los enlaces o links en color amarillo y con un tamaño de letra más grande. todos los links o enlaces a la página de sika se muestran en una nueva pestaña del navegador`,
      },
      {
        role: 'user',
        content: `Responde a las consultas con toda la información encontrada, ofrece respuestas claras y detalladas de los temas tratados en los archivos. Además, guía a los usuarios sobre cómo acceder y utilizar la información de SIKA méxico (https://mex.sika.com/) y de la página web https://mex.sika.com/ de manera efectiva sobre el siguiente tema delimitado por tres hyphens en formato markdown con frontmatter. todos los links o enlaces a la página web de sika y otros enlaces o links se abren en una pestaña nueva del navegador y se muestran de color amarillo:
        ---
        ${chatHistory[chatHistory.length - 1].content}
        ---
        `,
      },
    ],
    temperature: 0,
  });

  const chatGptResponse = completion.data.choices[0].message?.content;
  res.status(200).json({ chatGptResponse });
}