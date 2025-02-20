const isAuthenticated = (req, res, next) => {
    try {
        if(req.session.user === undefined) {
            return res.status(401).json('You do not have access to this page');
        }
        next();
    } catch (error) {
        res.status(500).send('Error authenticating user', error);
    }
  
};

module.exports = { 
    isAuthenticated 
};
