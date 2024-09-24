'use client';

import { createComment } from '@/lib/github';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CommentForm({ issueNumber }) {
  const [comment, setComment] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session) {
      await createComment(issueNumber, comment);
      setComment('');
      // Optionally, you can refresh the comments here
    }
  };

  if (!session) {
    return <p>Please sign in to comment.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className='mt-4'>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='w-full p-2 border rounded'
        rows={4}
        placeholder='Write a comment...'
      />
      <button type='submit' className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>
        Post Comment
      </button>
    </form>
  );
}
