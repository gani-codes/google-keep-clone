const bcrypt = require('bcryptjs');

const toHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const verifyPassword = async (uiPassword, dbPassword) => {
    const isPasswordCorrect = await bcrypt.compare(uiPassword, dbPassword);
    return isPasswordCorrect;
}

// const verifyPassword = (password, p2) => {
//     console.log(password);
//     console.log(p2)
//     return password === p2;
// }

module.exports = { toHashPassword, verifyPassword }