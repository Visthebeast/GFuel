const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { mail, pwd } = req.body;
    if (!mail || !pwd) return res.status(400).json({ 'message': 'email and password are required.' });

    const foundUser = await User.findOne({ EmployeeEmail: mail }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.EmployeePassword);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean); // assigning foundusers roles to variable roles
        // create JWTs
        const accessToken = jwt.sign( // sign is used to create jwt
            {
                "UserInfo": {
                    "EmployeeEmail": foundUser.EmployeeEmail,
                    "EmployeeId": foundUser.EmployeeId,
                    "EmployerId": foundUser.EmployerId,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "EmployeeName": foundUser.EmployeeName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });//secure:true,

        // Send authorization roles and access token to user
        res.json({ EmployeeId: foundUser.EmployeeId, EmployerId: foundUser.EmployerId,EmployeeEmail:foundUser.EmployeeEmail, roles, accessToken,EmployeeName:foundUser.EmployeeName })

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };