import { useState, useCallback } from "react";

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid({ ...isValid, [name]: e.target.validity.valid });
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = {}) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
        setValues,
        setIsValid,
    };
}
