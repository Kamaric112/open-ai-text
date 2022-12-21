import React, { useState } from 'react';
import './open-ai.css';
import { Configuration, OpenAIApi } from 'openai';

const ImageOpenAi = () => {
  const [prompt, setPrompt] = useState('');
  const [promptText, setPromptText] = useState('');

  const [result, setResult] = useState('');
  const [resultText, setResultText] = useState('');

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateText = async () => {
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Please turn this following message into a professional and polite email for clients  :${promptText}`,
      temperature: 0.6,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    console.log(res.data.choices[0].text!);
  };

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    setResult(res.data.data[0].url!);
  };
  return (
    <div className='app-main'>
      <>
        <h2>Generate an Image using Open AI API</h2>

        <textarea
          className='border border-red-400'
          placeholder='Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh..'
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage}>Generate an Image</button>

        {result.length > 0 ? <img className='result-image' src={result} alt='result' /> : <></>}
      </>

      <>
        <h2>Generate an Image using Open AI API</h2>

        <textarea
          className='border border-red-400'
          placeholder='Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh..'
          onChange={(e) => {
            setPromptText(e.target.value);
            console.log(promptText);
          }}
        />
        <button onClick={generateText}>Generate text</button>

        {resultText.length > 0 ? <textarea value={resultText} /> : <></>}
      </>
    </div>
  );
};

export default ImageOpenAi;
