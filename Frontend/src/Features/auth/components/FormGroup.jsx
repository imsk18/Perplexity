import React from 'react'

const FormGroup = ({value,label,placeholder,onChange,name,type= "text"}) => {
  return (
    <div className='formGroup'>
        <label htmlFor={label}>{label}</label>

        <input
         type={type}
         value={value}
         name={name}
         id= {label}
         onChange={onChange}
         placeholder={placeholder}
          />


    </div>
  )
}

export default FormGroup