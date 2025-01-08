export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <div className='card-content'>{children}</div>
    </div>
  )
}
