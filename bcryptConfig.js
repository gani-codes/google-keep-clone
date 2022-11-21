const bcrypt = require('bcryptjs');

//function to hash the password before saving into db
const toHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

//verifying the password given by user with hashed password
const verifyPassword = async (uiPassword, dbPassword) => {
    const isPasswordCorrect = await bcrypt.compare(uiPassword, dbPassword);
    return isPasswordCorrect;
}

module.exports = { toHashPassword, verifyPassword }