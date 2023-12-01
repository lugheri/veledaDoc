import React, { ChangeEvent } from 'react';
import { InputType,InputNumberType,TextAreaType,SelectType } from "./Dto/inputs.dto";

export const InputForm: React.FC<InputType> = (props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
    props.onChange(e.target.value)
  }
  return (
    <div className="flex flex-col flex-1">
      {!props.label ? false 
      : (<label className="font-semibold italic text-sm text-slate-500 dark:text-slate-300">
          {props.label}
        </label>)}
      <input 
        type={props.inputType ? props.inputType : "text"} 
        className={`shadow border border-slate-300 mb-4 rounded text-slate-700 p-2 placeholder:italic placeholder:text-slate-400
                  bg-white focus:border-b-2 focus:border-b-blue-400 focus:border-slate-300 focus:ring-0 ${props.className}`} 
        placeholder={props.placeholder} 
        value={props.value}
        required={props.required}
        onChange={handleInputChange} />
    </div>
  ) 
}

export const InputNumberForm: React.FC<InputNumberType> = (props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
    props.onChange(e.target.value)
  }
  return (
    <div className="flex flex-col flex-1">
      {!props.label ? false 
      : (<label className="font-semibold italic text-sm text-slate-500 dark:text-slate-300">
          {props.label}
        </label>)}
      <input 
        type="number" 
        className={`shadow border border-slate-300 mb-4 rounded text-slate-700 p-2 placeholder:italic placeholder:text-slate-400
                  bg-white focus:border-b-2 focus:border-b-blue-400 focus:border-slate-300 focus:ring-0 ${props.className}`} 
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        required={props.required}
        onChange={handleInputChange} />
    </div>
  ) 
}

export const TextAreaForm: React.FC<TextAreaType> = (props) => {
  const handleTextareaChange  = (e: ChangeEvent<HTMLTextAreaElement>)=>{
    props.onChange(e.target.value)
  }
  return (
    <div className="flex flex-col flex-1">
      {!props.label ? false 
      : (<label className="font-semibold italic text-sm text-slate-500 dark:text-slate-300">
         {props.label}
        </label>)}
      <textarea 
        className={`shadow border border-slate-300 mb-4 rounded text-slate-700 p-2 placeholder:italic placeholder:text-slate-400
                  bg-white focus:border-b-2 focus:border-b-blue-400 focus:border-slate-300 focus:ring-0 ${props.className}`} 
        value={props.value}
        placeholder={props.placeholder} 
        required={props.required}
        onChange={handleTextareaChange } />
    </div>
  ) 
}

export const SelectForm: React.FC<SelectType> = (props) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>)=>{
    props.onChange(e.target.value)
  }
  return (
    <div className="flex flex-col flex-1">
      {!props.label ? false 
      : (<label className="font-semibold italic text-sm text-slate-500 dark:text-slate-300">
          {props.label}
        </label>)}  
      <select 
        className={`shadow border border-slate-300 rounded text-slate-700 p-2 placeholder:italic placeholder:text-slate-400
                   bg-white focus:border-b-2 focus:border-b-blue-400 focus:border-slate-300 focus:ring-0 ${props.className}`} 
        value={props.value} 
        onChange={handleSelectChange} 
        required={props.required}>
          { props.empty ? ( <option value="">{props.empty}</option>) : false}
          { !props.valueOption ? false
            : props.dataOptions.map((option:any, index:any) => (
              <option 
                key={index} 
                value={option[props.valueOption]}>
                  {option[props.labelOption]}
              </option>
             ))}
      </select>
    </div>
  ) 
}
//export const Range = () => {}