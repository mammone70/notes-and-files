import { CardWrapper } from "@/components/auth/cardwrapper"

export const LoginForm = () : any => {
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial    
        >
            Login Form
        </CardWrapper>
    )
}