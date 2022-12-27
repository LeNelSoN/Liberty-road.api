module.exports.creatHash = async (password) => {

    pswd = process.env.CUSTOM_PASSWORD_PREFIX + password;

    const salt = await bcrypt.genSalt(12);;

    let hashedPassword = await bcrypt.hash(pswd, salt);
    hashedPassword = hashedPassword.split("$2b$12$")[1];

    return hashedPassword;
}

module.exports.passwordVerify = async (requestPswd, verifyPswd) => {

    if(!requestPswd || !verifyPswd){
        return false;
    };

    const prefix = "$2b$12$";

    verifyPswd = prefix+verifyPswd
    requestPswd = process.env.CUSTOM_PASSWORD_PREFIX + requestPswd

    let isValidPswd= false;
    isValidPswd = await bcrypt.compare(requestPswd, verifyPswd);

    return isValidPswd;
}