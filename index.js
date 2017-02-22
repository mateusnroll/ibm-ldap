const passport     = require('passport');
const ldapStrategy = require('passport-ldapauth');
const allowedAttributes = [
  'dn', 'controls', 'objectClass', 'ou', 'o', 'ibmSerialNumber', 'employeeCountryCode', 
  'isManager', 'managerCountryCode', 'co', 'uid', 'c', 'serialNumber', 'hrActive', 
  'hrCompanyCode', 'hrCountryCode', 'hrFirstName', 'hrManagerIndicator', 'emailAddress', 
  'mail', 'notesEmail', 'notesId', 'notesMailDomain', 'notesShortName', 'primaryNode', 'primaryUserId', 
  'infotelephonenumber', 'personaltitle', 'jobresponsibilities', 'hrEmployeeType', 'employeeType', 
  'preferredIdentity', 'iptelephonenumber', 'telephoneNumber', 'tieline', 'alternateTelephoneNumber', 
  'mobile', 'timestampBpgui', 'hrLastName', 'coreDataIntegrity', 'directoryAlias', 'odmEntry', 'div', 
  'notesMailFile', 'notesMailServer', 'buildingName', 'floor', 'ibmLoc', 'physicalDeliveryOfficeName', 
  'workLoc', 'workLocation', 'workplaceIndicator', 'givenName', 'sn', 'timestampFeed', 'costCenter', 
  'dept', 'divDept', 'hrOrganizationCode', 'callupName', 'cn', 'entryType', 'hrOrgUnitCode', 'manager', 
  'managerSerialNumber', 'timestampHRMS', 'preferredLastName', 'timestampBpguiRI', 'passwordIsExpired', 
  'passwordisreset', 'passwordIsResetByAdmin', 'passwordIsStruckOut', 'passwordModifyTimestamp']

// Setup passport with IBM's LDAP config
const config = { server: {
    url: 'ldaps://bluepages.ibm.com:636',
    searchBase: 'ou=bluepages,o=ibm.com',
    searchFilter: '(mail={{username}})'
}}

module.exports = {
  initialize: function(attributes) {
    if (attributes) {
      let tmpAttributes = []
      for (let attribute of attributes) {
        if (allowedAttributes.indexOf(attribute) > 0) { tmpAttributes.push(attribute) }
      }
      config.server.searchAttributes = tmpAttributes
    }

    passport.use(new ldapStrategy(config))
    passport.initialize()
  },

  authenticate: function(req, res, next) {
    passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
      if (err || !user) { return res.sendStatus(401) }
      if (Array.isArray(user.cn) && user.cn.length > 0) { user.cn = user.cn[0] }
      if (Array.isArray(user.mail) && user.mail.length > 0){ user.mail = user.mail[0] }

      req.user = user
      next();
    })(req, res, next);
  }
}