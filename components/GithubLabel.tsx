export default function GithubLabel({ label }: { label: string }) {
  return (
    <span className='inline-block px-3 py-2 bg-gray-100 border rounded-lg text-base leading-none whitespace-nowrap hover:text-blue-500 transition-colors duration-400 cursor-pointer'>
      {label}
    </span>
  );
}
