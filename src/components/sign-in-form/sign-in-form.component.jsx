import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firbase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const SignInWithGoogle = async () => {
     await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch(err) {
            
            switch(err.code){
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user with this email');
                    break;
                case 'auth/popup-closed-by-user':
                    alert('Closed by user');
                    break;
                default:
                    console.log(err.code);
            }
        }
    };

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput 
                    label="Email"
                    type='email' 
                    required
                    onChange={ handleChange } 
                    name="email"
                    value={ email }
                />

                <FormInput 
                    label="Password"
                    type='password' 
                    required
                    onChange={ handleChange } 
                    name="password" 
                    value={ password } 
                />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={ SignInWithGoogle }>Google Sign In</Button>
                </div>

            </form>
        </div>
    );
};

export default SignInForm;