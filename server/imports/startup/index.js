//import async
async = require('async')
_ = require('underscore')

// Load Variables
import './settings.js'

// Start Logging
import './log.js'

// Setup User Authentication
import './auth.js'

// Start ETCD
import './etcd.js'

// Start Meteor Methods
import './methods.js'

// Start Cache
import './cache.js'

//Init Docker

import './docker.js'
