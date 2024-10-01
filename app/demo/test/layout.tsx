export default function RootLayout({ children, profile }: { children: React.ReactNode; profile: React.ReactNode }) {
  return (
    <div className='bg-cyan-200'>
      {children}
      {profile}
    </div>
  );
}
