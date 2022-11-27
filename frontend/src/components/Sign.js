import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Sign({ name, title, onSubmit, buttonText, children }) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.password, values.email);
    }

    React.useEffect(() => {
        resetForm(
            { email: "", password: "" },
            { email: "", password: "" },
            { email: true, password: true }
        );
    }, []);

    return (
        <div className="sign__container">
            <h2 className="sign__title">{title}</h2>
            <form
                className="sign__form"
                id={`sign-${name}-form`}
                name={`sign-${name}-form`}
                onSubmit={handleSubmit}
            >
                <fieldset className="sign__inputs">
                    <input
                        type="email"
                        className={
                            isValid.email
                                ? "sign__input"
                                : "sign__input sign__input_active"
                        }
                        id={`sign-${name}-email`}
                        name="email"
                        value={values.email ? values.email : ""}
                        placeholder="E-mail"
                        required
                        minLength="5"
                        maxLength="40"
                        onChange={handleChange}
                    />
                    <span
                        className="sign__input-error"
                        id={`sign-${name}-email-input-error`}
                    >
                        {errors.email}
                    </span>
                    <input
                        type="password"
                        className={
                            isValid.password
                                ? "sign__input"
                                : "sign__input sign__input_active"
                        }
                        id={`sign-${name}-password`}
                        name="password"
                        value={values.password ? values.password : ""}
                        placeholder="Пароль"
                        required
                        minLength="4"
                        onChange={handleChange}
                    />
                    <span
                        className="sign__input-error"
                        id={`sign-${name}-input-error`}
                    >
                        {errors.password}
                    </span>
                    <input
                        type="submit"
                        className={
                            children
                                ? "sign__save-button sign__save-button_alone"
                                : "sign__save-button"
                        }
                        id={`sign-${name}__save-button`}
                        value={buttonText}
                        disabled={
                            !(
                                isValid.email &&
                                isValid.password &&
                                values.email &&
                                values.password
                            )
                        }
                    />
                </fieldset>
            </form>
            {children}
        </div>
    );
}

export default Sign;
