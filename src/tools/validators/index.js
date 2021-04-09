const isValidEmail = (email, emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) =>  emailRegex.test(email);

const isValidPassword = password => password.length >= 8; 

const isValidUseerName = userName => userName.length >= 3; 

export { isValidEmail, isValidPassword, isValidUseerName } ;
