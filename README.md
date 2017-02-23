## Install
Run `npm install ibm-ldap --save`

## Information of Require
The module will accept 2 types of parameters, one as `String` and other as `Array`. Based on its type the module will set properties and filter properly.

## Usage

###### Default (Auth: Email, Attr: All)
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')()
const controller = require('path/to/file')

routes.post('/login', ldap, controller.login)
```

###### Example 1 (Auth: Email, Attr: Specific)
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')(['cn', 'uid', 'mail', 'employeeCountryCode'])
const controller = require('path/to/file')

routes.post('/login', ldap, controller.login)
```

###### Example 2 (Auth: UID, Attr: All)
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')('uid')
const controller = require('path/to/file')

routes.post('/login', ldap, controller.login)
```

###### Example 3 (Auth: UID, Attr: Specific)
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')(['cn', 'uid', 'mail', 'employeeCountryCode'], 'uid')
const controller = require('path/to/file')

routes.post('/login', ldap, controller.login)
```

###### Example 4 (Auth: UID, Attr: Specific)
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')('uid', ['cn', 'uid', 'mail', 'employeeCountryCode'])
const controller = require('path/to/file')

routes.post('/login', ldap, controller.login)
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

## Contributors
- [@mateusnroll](https://github.com/mateusnroll)
- [@niightly](https://github.com/niightly)
