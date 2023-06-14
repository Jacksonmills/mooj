'use client';
import { askQuestion } from '@/utils/api';
import React, { ChangeEvent, SyntheticEvent } from 'react';

export default function Question() {
  const [question, setQuestion] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { data } = await askQuestion(question);
    setAnswer(data);
    setQuestion('');
    setLoading(false);
  };

  return (
    <div>
      <form className='flex' onSubmit={handleSubmit}>
        <input
          className='border border-black/10 p-2 w-full rounded-l-md outline-none text-black bg-red-400 focus:bg-red-500 placeholder-black font-bold'
          type="text"
          placeholder="What's on your mind?"
          value={question}
          onChange={handleChange}
        />
        <button className='bg-red-400 px-4 py-2 rounded-r-md font-bold' type="submit">Ask</button>
      </form>
      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  );
}
