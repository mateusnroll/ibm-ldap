const passport     = require('passport');
const ldapStrategy = require('passport-ldapauth');

// Setup passport with IBM's LDAP config
const config = { server: {
    url: 'ldaps://bluepages.ibm.com:636',
    searchBase: 'ou=bluepages,o=ibm.com',
    searchFilter: '(mail={{username}})',
    searchAttributes: ['cn', 'uid', 'mail']
}}
passport.use(new ldapStrategy(config))
passport.initialize()

module.exports = function(req, res, next) {
    passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
		if (err || !user)
        	return res.sendStatus(401)
      	
      	// Sometimes user and mail can be arrays. Choose the first option
      	// instead and make it a string
        if (Array.isArray(user.cn) && user.cn.length > 0)
			user.cn = user.cn[0]
        if (Array.isArray(user.mail) && user.mail.length > 0)
			user.mail = user.mail[0]

		req.user = user
		next();
    })(req, res, next);
  }
