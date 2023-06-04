interface ToggleProps {
  id: string
  name: string
  checked: boolean
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  name,
  checked,
  label,
  onChange,
}) => {
  return (
    <div className='inline-flex items-center justify-between p-2 w-full'>
      <label htmlFor={id} className='cursor-pointer'>
        {label}
      </label>
      <label htmlFor={id} className='relative inline-flex items-center'>
        <input
          id={id}
          type='checkbox'
          checked={checked}
          className='sr-only peer'
          name={name}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'></span>
      </label>
    </div>
  )
}

export default Toggle
