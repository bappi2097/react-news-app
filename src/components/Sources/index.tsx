import { useEffect, useState } from "react"
import { NewsSourceType } from "../../utils/types"
import fetchAPI from "../../utils/fetch"
import { useGlobalContext } from "../../context/GlobalContext"
import Toggle from "../Toggle"
import useAuthContext from "../../hooks/useAuthContext"

interface SourcesProps {
  preferences: number[]
  onChange: (params: number[]) => void
  collapsable?: boolean
}

const Sources: React.FC<SourcesProps> = (props) => {
  const { token } = useAuthContext()
  const { setLoader } = useGlobalContext()
  const [newsSources, setNewsSources] = useState<NewsSourceType[]>([])
  const [expend, setExpend] = useState(false)

  const handleChange = (checked: boolean, preferenceId: number) => {
    props.onChange(
      checked
        ? [...props.preferences, preferenceId]
        : [...props.preferences.filter((id) => id !== preferenceId)]
    )
  }

  const isExpend = () => {
    if (props.collapsable) {
      return expend
    }
    return true
  }

  useEffect(() => {
    setLoader(true)
    fetchAPI("api/news-source/", { method: "GET" }, token)
      .then((response) => response.json())
      .then((response) => setNewsSources(response.data))
      .catch(console.log)
      .finally(() => setLoader(false))
  }, [])

  return (
    <>
      <div className={`${isExpend() ? "h-auto" : "max-h-40 overflow-hidden"}`}>
        {newsSources.map((newsSource) => (
          <Toggle
            key={newsSource.key}
            id={newsSource.key}
            checked={props.preferences.includes(newsSource.id)}
            name='checkbox'
            onChange={({ target }) =>
              handleChange(target.checked, newsSource.id)
            }
            label={newsSource.name}
          />
        ))}
      </div>
      {props.collapsable && (
        <div className='w-full text-right pr-4'>
          <span
            className='text-blue-600 underline cursor-pointer'
            onClick={() => setExpend((prev) => !prev)}
          >
            {expend ? "less..." : "more..."}
          </span>
        </div>
      )}
    </>
  )
}

export default Sources
