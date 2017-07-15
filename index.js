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

class LDAP {
  constructor(){
    this.config = { server: {
        url: 'ldaps://bluepages.ibm.com:636',
        searchBase: 'ou=bluepages,o=ibm.com',
        searchFilter: '(mail={{username}})'
    } }
  }

  initialize() {
    passport.use(new ldapStrategy(this.config))
    passport.initialize()
  }

  authenticate(req, res, next) {
    passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
      if (err || !user) { return res.sendStatus(401) }
      if (Array.isArray(user.cn) && user.cn.length > 0) { user.cn = user.cn[0] }
      if (Array.isArray(user.mail) && user.mail.length > 0){ user.mail = user.mail[0] }

      req.user = user
      next();
    })(req, res, next);
  }

  identifyAndSetParameters(param1, param2){
    let filter
    let attributes
    if (Array.isArray(param1) && Array.isArray(param2)) {
      attributes = param1
    } else if (Array.isArray(param1)) {
      attributes = param1
      filter = param2
    } else if (Array.isArray(param2)) {
      attributes = param2
      filter = param1
    }
    
    this._setAttributes(attributes)
    this._setSearchFilter(filter)
  }

  _setAttributes(attributes){
    if (attributes) {
      let tmpAttributes = []
      for (let attribute of attributes) {
        if (allowedAttributes.indexOf(attribute) > 0) { tmpAttributes.push(attribute) }
      }
      this.config.server.searchAttributes = tmpAttributes
    }
  }

  _setSearchFilter(param){
    if (param && typeof param ==='string' && param.toLowerCase() === 'uid') { 
      this.config.server.searchFilter = '(uid={{username}})' 
    } else {
      this.config.server.searchFilter = '(mail={{username}})'
    }
  }
}

/**
 * Allow to return the module instantiated without using new when require the module.
 */
const objectLDAP = new LDAP()
function authenticate(param1, param2) {
  objectLDAP.identifyAndSetParameters(param1, param2)
  objectLDAP.initialize()
 
  return objectLDAP.authenticate
}

module.exports = authenticate
