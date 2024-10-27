// hooks/useForm.js
import { useState } from 'react';

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleError = (name, message) => {
        setErrors({
            ...errors,
            [name]: message
        });
    };

    const clearError = (name) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name];
            return updatedErrors;
        });
    };

    return {
        values,
        errors,
        handleChange,
        handleError,
        clearError
    };
}
