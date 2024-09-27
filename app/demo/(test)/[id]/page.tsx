export default function Page({ params }: { params: { id: string } }) {
  return <div>My Demo: {params.id}</div>;
}
