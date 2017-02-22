## Install
Run `npm install ibm-ldap --save`

## Methods
Below follow a description about each method that was included on the app.

#### LDAP.Initialize
This method is __mandatory__ it will configure and initialize the passport module.

|Params      | Type | Description
| ------       | ---     | ---
| `attributes` | Array | *Optional*. Contains all attributes you want to retrieve from LDAP

> If attributes is left undefined it will retrieve all attributes available on LDAP.

#### LDAP.authenticate
This method is __mandatory__ for the routes you want to intercept and apply the login.

> If attributes is left undefined it will retrieve all attributes available on LDAP.

## Usage
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')
const controller = require('path/to/file')

ldap.initialize(['cn', 'uid', 'mail', 'employeeCountryCode'])

routes.post('/login', ldap.authenticate, controller.login)
```

## Allowed Attributes
Only the properties below will be accepted
```javascript
{ 
  dn: <String>,
  controls: [<String>],
  objectclass: [<String>],
  ou:<String>,
  co: <String>,
  uid: <String>,
  serialnumber: <String>,
  entrytype: <String>,
  hrOrganizationCode: <String>,
  ibmserialnumber: <String>,
  o: <String>,
  hrcompanycode: <String>,
  c: <String>,
  employeecountrycode: <String>,
  ismanager: <String>,
  coreDataIntegrity: <String>,
  directoryAlias: <String>,
  givenName: [<String>],
  odmEntry: <String>,
  notesEmail: <String>,
  notesId: <String>,
  notesMailDomain: <String>,
  notesShortName: <String>,
  primaryNode: <String>,
  primaryUserId: <String>,
  emailAddress: [<String>],
  mail: <String>,
  preferredIdentity: <String>,
  jobResponsibilities: <String>,
  timestampBpguiRI: <String>,
  passwordIsExpired: <String>,
  passwordisreset: <String>,
  passwordIsResetByAdmin: <String>,
  passwordIsStruckOut: <String>,
  passwordModifyTimestamp: <String>,
  administrator: <String>,
  callupname: <String>,
  contractorrecordexpiration: <String>,
  department: <String>,
  dept: <String>,
  employeetype: <String>,
  manager: <String>,
  managercountrycode: <String>,
  managerserialnumber: <String>,
  shift: <String>,
  cn: <String>,
  sn: [<String>],
  notesMailFile: <String>,
  notesMailServer: <String>,
  timestampFeed: <String>
}
```

