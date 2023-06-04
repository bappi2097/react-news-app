import { dateToString } from "../../utils"
import { NewsType } from "../../utils/types"

interface NewsProps {
  data: NewsType
}

const News: React.FC<NewsProps> = ({ data }) => {
  return (
    <div className='bg-white rounded shadow-sm xl:w-[70%] lg:w-[80%] w-[90%] p-4 m-4'>
      <div className='text-xl mb-2 font-semibold'>{data.title}</div>
      <div className='text-sm mb-2 text-gray-600'>{data.description}</div>
      <div className='flex justify-between text-sm font-bold text-gray-600'>
        <div>{data.author}</div>
        <div className='flex gap-4'>
          <div>{dateToString(data.publishedAt)}</div>
          <a
            href={data.url}
            className='bg-gray-50 rounded  hover:text-blue-600'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default News
