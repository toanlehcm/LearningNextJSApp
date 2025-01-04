import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Chart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='value' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}
