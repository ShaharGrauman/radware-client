
export const field = ({name = '', value = '', isRequired = true, minLength, pattern }) => {
    const fieldResult = {
        name,
        value,
        errors: [],
        validations: {}
    }

    if(isRequired){
        fieldResult.validations.isRequired = isRequired;
    }
    if(minLength){
        fieldResult.validations.minLength = minLength;
    }
    if(pattern){
        fieldResult.validations.pattern = pattern;
    }

    return fieldResult;
}

export default (name, value, validations) => {
    const errors = [];

    if(validations.isRequired){
        if(required(value)){
            errors.push(`${name} is required`);
        }
    }
    if(validations.minLength){
        if(minLength(value, validations.minLength)){
            errors.push(`${name} should be no less than ${validations.minLength} characthers`)
        }
    }
    if(validations.pattern){
        if(!pattern(value, validations.pattern)){
            errors.push(`${name} should be a valid format`);
        }
    }

    return errors;
}

const required = value => !value;

const minLength = (value, min) => value.length < min;

const pattern = (value, regex) => regex.test(value);