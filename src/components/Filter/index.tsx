import { useEffect, useState } from "react"
import TextField from "../TextField"
import Sources from "../Sources"

interface FilterProps {
  filter: { date: string; preferences: number[] }
  onChange: (filter: { date: string; preferences: number[] }) => void
}

const Filter: React.FC<FilterProps> = (props) => {
  const [date, setDate] = useState(props.filter.date)

  const [preferences, setPreferences] = useState<number[]>(
    props.filter.preferences
  )

  const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setDate(value)
  }

  useEffect(() => {
    props.onChange({
      preferences,
      date,
    })
  }, [date, preferences])

  return (
    <>
      <div className='text-xl text-gray-600 pt-2 px-2'>Filter By:</div>
      <div className='text-lg text-gray-900 pb-2 px-2'>Date</div>
      <div className='-mt-2 px-2'>
        <TextField
          name='date'
          value={date}
          onChange={handleDateChange}
          id='date'
          type='date'
        />
      </div>
      <div className='text-lg text-gray-900 pb-2 px-2 mt-2'>Sources</div>
      <div className='-mt-2 px-2'>
        <Sources
          preferences={preferences}
          onChange={(param) => setPreferences(param)}
          collapsable
        />
      </div>
    </>
  )
}

export default Filter
