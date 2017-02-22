## Install
Run `npm install ibm-ldap --save`

## Usage
Below follows a simple example about how to use it.
```javascript
const ldap = require('ibm-ldap')
const controller = require('path/to/file')

ldap.initialize(['cn', 'uid', 'mail', 'employeeCountryCode'])

routes.post('/login', ldap.authenticate, controller.login)
```

