const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.EmployeeName !== decoded.EmployeeName) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "EmployeeEmail": foundUser.EmployeeEmail,
                        "EmployeeId": foundUser.EmployeeId,
                        "EmployerId": foundUser.EmployerId,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ EmployeeId: foundUser.EmployeeId, EmployerId: foundUser.EmployerId,EmployeeEmail:foundUser.EmployeeEmail, roles, accessToken,EmployeeName:foundUser.EmployeeName })
        }
    );
}

module.exports = { handleRefreshToken }