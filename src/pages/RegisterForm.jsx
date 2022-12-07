import { Avatar, Box, InputAdornment, Typography, Button } from "@mui/material"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextFields from "../components/TextFields";
import SelectFields from "../components/SelectFields";
import CheckboxFields from "../components/CheckboxFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { pawdRegExp, phoneRegExp } from "../utils";

// Create schema validation
const schema = yup.object({
    fullName: yup.string().required('Full name is required!'),
    email:yup.string().required('Email is required!').email(),
    mobile:yup.string().required('Mobile Number is required!').matches(phoneRegExp, 'Phone Number is no valid'),
    country:yup.string().required('Country is required!'),
    password:yup.string().required('Password is required!').matches(pawdRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
    confirmpass:yup.string().oneOf([yup.ref('password'), null], 'Password must Match'),
    privacy:yup.bool().oneOf([true], 'Field must be checked.')
});


const RegisterForm = () => {

    const { handleSubmit,reset, control, formState: {errors} } = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            country:'',
            mobile:'',
            password:'',
            confirmpass:'',
            privacy:false
        },
        resolver: yupResolver(schema)
    });
    console.log(errors);
    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

  return (
    <Box sx={{ 
        display:'flex',
        flexDirection: 'column',
        mt: '4rem',
        alignItems: 'center'
     }}>
        <Avatar sx={{ m: '1', bgcolor: 'secondary.main' }}>
            <HowToRegIcon />
        </Avatar>
        <Typography component='h1'>Sign Up</Typography>


            { /* Form */ }

            <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{
                width:'100%',
                mt: '2rem'
            }}>
                <TextFields errors={errors} control={control} name='fullName' label='Full Name' />
                <TextFields errors={errors} control={control} name='email' label='Email' />
                <TextFields errors={errors} control={control} name='mobile' label='Mobile Number'  inputProps={{
                    startAdornment: <InputAdornment position="start"> +90</InputAdornment>,
                    type:'number'
                }} />
                <SelectFields errors={errors} control={control} name='country' label='Country' />
                <TextFields errors={errors} control={control} name='password' label='Password' />
                <TextFields errors={errors} control={control} name='confirmpass' label='Confirm Password' />
                <CheckboxFields errors={errors} control={control} name='privacy' />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt:3, mb: 2 }}
                >Sign up</Button>
            </Box>

    </Box>
  )
}

export default RegisterForm