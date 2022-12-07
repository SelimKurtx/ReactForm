import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import { addErrorIntoField } from '../utils'
import ErrorMessage from './ErrorMessage'

const CheckboxFields = ({name, control, errors}) => {
  return (
    <>
    <Controller 
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel  control={<Checkbox {...addErrorIntoField(errors[name])} {...field} required />} label="I Agree to MyApp Terms and Policy" />
        )}
    />
    {errors[name] ? <ErrorMessage message={errors[name].message} /> : null }
    </>
   
  )
}

export default CheckboxFields