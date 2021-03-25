import React, {useState, useEffect} from 'react'

export function useForm(initValues, validate, callback) {

    const [values, setValues] = useState(initValues);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setSubmitted] = useState(false);
 
    const onChange = (e) => {
        const {value, name} = e.target;

        setValues({
            ...values,
            [name] : value
        });
 

    }

    const handleSubmit = (e) =>{
        e.preventDefault();        
        setErrors(validate(values));
        setSubmitted(true);
        
    }

    useEffect(() => {
        let isMounted = true;

        if(Object.keys(errors).length === 0 && isSubmitted){
            callback(values);
            setValues(initValues);
        }

        return () => {
            isMounted = false;
        }
    }, [errors])

    return {onChange, values,errors, handleSubmit }
}
 
export function Form(props) {
 
    return (
        
            <form autoComplete="off" onSubmit = {props.onSubmit}>
                {props.children}
            </form>
        
    )
}
