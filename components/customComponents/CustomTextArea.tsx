import React, { useState } from 'react'

type CustomTextAreaProps = {
  label: string
  name: string
  required?: boolean
  initialValue?: string
}

const CustomTextArea = ({name, label, required, initialValue}: CustomTextAreaProps) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <>
      <label className='text-secondary'>{label}</label>
      <textarea
        id={name}
        name={name}
        required={required}
        value={value || ''}
        onChange={handleChange}
        className={`bg-transparent border border-secondary rounded-md my-2 w-full ${
          value ? 'text-secondary' : 'text-secondary'
        }`}
      />
  </>
  )
}

export default CustomTextArea
