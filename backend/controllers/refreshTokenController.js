const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    //console.log(req.headers);
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(403); // Forbidden

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) {
                    // Invalid token or mismatched username
                    return res.sendStatus(403);
                }

                // Rotate the refresh token
                const newRefreshToken = jwt.sign(
                    { username: foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '7d' } // Set the expiration time for the new refresh token
                );

                // Create a new access token
                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": decoded.username,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' }
                );

                // Update the refresh token in the database
                foundUser.refreshToken = newRefreshToken;
                foundUser.save();

                // Send the new access token and refresh token to the client
                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true });
                res.json({ roles, accessToken });
            }
        );
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.sendStatus(500); // Internal Server Error
    }
};

module.exports = { handleRefreshToken };
