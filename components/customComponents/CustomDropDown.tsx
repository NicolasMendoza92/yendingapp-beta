import React, { useState } from 'react'

interface Values {
  label: string
  value: string
}

type CustomDropDownsProps = {
  name: string
  label: string
  values?: Values[]
  type: string
  initialValue?: string | boolean
}
const CustomDropDowns = ({
  name,
  label,
  values,
  type,
  initialValue = '',
}: CustomDropDownsProps) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: { target: any }) => {
    const { type, value, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    setValue(fieldValue)
  }


  return (
    <>
      {type === 'checkbox' ? (
        <div className="py-2 flex flex-wrap gap-3">
          <label className="flex font-medium text-secondary"> {label}</label>
          <input
            type="checkbox"
            name={name}
            onChange={handleChange}
            checked={value as boolean}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <label className="text-secondary">{label}</label>
          <select
            id={name}
            name={name}
            value={value as string || ''}
            className={`w-full ${value ? 'text-secondary' : 'text-secondary'}`}
            onChange={handleChange}

          >
            {values?.map((value, i) => (
              <option key={`value_${i}`} value={value.value}>
                {value.label}
              </option>
            ))}
          </select>
          <input type="hidden" name={name} value={value as string || ''} />
        </div>
      )}
    </>
  )
}

export default CustomDropDowns
