export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value,rule) =>{
    let isValid = true;
    if(rule.required){
        isValid = (value.trim() !== '' && value.length >4) && isValid;
    }
    if(rule.maxLangth)
    {
        isValid = value.length >= rule.maxLangth && isValid;
    }
    if(rule.minLangth)
    {
        isValid = value.length <= rule.minLangth && isValid; 
    }
    if(rule.isEmail)
    {

        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}