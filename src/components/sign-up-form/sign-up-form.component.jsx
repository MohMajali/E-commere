import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firbase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
    
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {
                displayName
            });

            resetFormFields();

        } catch(err) {
            if(err.code === 'auth/email-already-in-use' || err.code === 'auth/weak-password'){
                alert('Email already in use');
            } else {
                console.log('ERROR 2 ',err);
            }
            
        }
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput label="Name"
                    type='text' 
                    onChange={ handleChange } 
                    name="displayName" 
                    value={ displayName } 
                    required
                />

                <FormInput label="Email"
                    type='email' 
                    onChange={ handleChange } 
                    name="email" 
                    value={ email }
                    required
                />

                <FormInput label="Password"
                    type='password' 
                    onChange={ handleChange } 
                    name="password" 
                    value={ password } 
                    required
                />

                <FormInput label="Confirm Password"
                    type='password' 
                    onChange={ handleChange } 
                    name="confirmPassword" 
                    value={ confirmPassword } 
                    required
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;