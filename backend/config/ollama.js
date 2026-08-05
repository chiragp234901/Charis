import { Ollama } from "ollama";

console.log("OLLAMA_HOST =", process.env.OLLAMA_HOST);
const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
});

export default ollama;