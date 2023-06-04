import fetchAPI from "../../utils/fetch"
import News from "../../components/News"
import { NewsType } from "../../utils/types"
import Filter from "../../components/Filter"
import Button from "../../components/Button"
import React, { useEffect, useState } from "react"
import TextField from "../../components/TextField"
import useAuthContext from "../../hooks/useAuthContext"
import Loader from "../../components/Loader"

const Home = () => {
  const [loader, setLoader] = useState(false)
  const { token, user } = useAuthContext()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<{ date: string; preferences: number[] }>(
    { date: "", preferences: user?.preferences ?? [] }
  )
  const [newses, setNewses] = useState<NewsType[]>([])
  const [page, setPage] = useState(0)

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearch(value)
  }
  const handleSearch = (more: boolean = false) => {
    setLoader(true)
    const params = new URLSearchParams({
      date: filter.date,
      preferences: filter.preferences.join(","),
      keyword: search,
      page: String(page + 1),
    })
    fetchAPI("api/news-feed?" + params, { method: "GET" }, token)
      .then((response) => response.json())
      .then((response) => {
        if (response.data) {
          if (more) {
            setNewses((prev) => [...prev, ...response.data])
          } else {
            setNewses(response.data)
          }
          setPage(response.page)
        }
      })
      .catch(console.log)
      .finally(() => setLoader(false))
  }

  useEffect(() => {
    handleSearch()
  }, [JSON.stringify(filter)])

  return (
    <div className='grid grid-cols-12 lg:grid-rows-5 gap-2 px-4'>
      <div className='lg:row-start-1 col-start-1 lg:row-end-6 col-end-13 lg:col-end-4 xl:col-end-3 bg-gray-50'>
        <div className='text-lg text-gray-600 py-2 px-2'>Search</div>
        <div className='grid grid-cols-[auto,80px] items-center -mt-4 px-2'>
          <TextField
            name='search'
            value={search}
            onChange={handleSearchChange}
            id='search'
            placeholder='keyword'
          />
          <Button className='mt-2' onClick={() => handleSearch()}>
            Search
          </Button>
        </div>
        <Filter filter={filter} onChange={(param) => setFilter(param)} />
      </div>
      <div className='lg:row-start-1 col-start-1 lg:col-start-4 xl:col-start-3 lg:row-end-6 col-end-13 bg-gray-50'>
        {newses.map((news) => (
          <News data={news} key={news.url} />
        ))}
        {newses.length > 0 && (
          <div className='xl:w-[70%] lg:w-[80%] w-[90%] p-4 m-4'>
            <Button
              className='mt-2 w-[80px] m-auto'
              onClick={() => handleSearch(true)}
            >
              More
            </Button>
          </div>
        )}
      </div>
      {loader && <Loader />}
    </div>
  )
}

export default Home
