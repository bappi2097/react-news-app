import { useState } from "react"
import Toggle from "../../components/Toggle"

interface SettingProps {}

const Setting: React.FC<SettingProps> = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div>
      <Toggle
        checked={checked}
        name='checkbox'
        onChange={() => setChecked((prev) => !prev)}
      />
    </div>
  )
}

export default Setting
