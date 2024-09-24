import { markdownToHtml } from '@/lib/markdown';

export default async function Comments({ comments }) {
  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Comments</h2>
      {comments.map(async (comment) => {
        const content = await markdownToHtml(comment.body);
        return (
          <div key={comment.id} className='border-t py-4'>
            <div className='flex items-center space-x-2'>
              <img src={comment.user.avatar_url} alt={comment.user.login} className='w-8 h-8 rounded-full' />
              <span className='font-semibold'>{comment.user.login}</span>
              <time className='text-gray-500' dateTime={comment.created_at}>
                {new Date(comment.created_at).toLocaleDateString()}
              </time>
            </div>
            <div className='mt-2 prose' dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      })}
    </div>
  );
}
