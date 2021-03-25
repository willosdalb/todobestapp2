export const validateValues = values =>{
    let errors = {};

    if(values.hasOwnProperty('task')){
        if(values.task === ''){
            errors.task = 'Please enter Task'
        }
    }

    return errors;
}

export default validateValues;