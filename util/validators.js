//step 19
module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}; //empty object for now
    if(username.trim() == ''){
        //if username is empty
        errors.username = 'Username must not be empty';
    }
    if(email.trim() == ''){
        //if email is empty
        errors.email = 'Email must not be empty';
    }else{
        //i added '' bc it was open otherwise??
        const regEx = '/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/';
        if(!email.match(regEx)){
            //if not matching regEx (regular expression)
            errors.email= 'Email must be a valid email address';
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 // fi true then no errors
    }
};

//step 20. validator for login data 
module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(password.trim() ===''){
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 // fi true then no errors
    }
}