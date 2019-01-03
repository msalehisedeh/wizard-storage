# Welcome to Wizard Storage!

Have you ever been in need of using localStorage or sessionStorage in a more inteligent way? Have you thought of having an expiring storage data or a data tied up with a version number? This wizard allows you to just do that.

You can use this wizard to listen to changing of a specific key you have stored in storage. You can set a version number on a key and get the value only if correct version is supplied when retreiving data. Or set a time to expire the key in x number of hours.

**I appreciate comments and ideas to make this tool versatile.**


[Live Demo](https://wizard-storage.stackblitz.io) | [Source code](https://github.com/msalehisedeh/wizard-storage/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/wizard-storage/issues)


### Methods and arguments
```javascript
// return true if storage is supported by the browser
local.isSupported() 
session.isSupported() 

// returns an observer to subscribe to.
local.onchange(
    key // key to keep a refrence
)
session.onchange(key) 

// sets the value of key in storage tied up with 
// expiration and or version number if supplied.
local.setItem(
    key     // key to keep a refrence
    value   // value to be stored
    version // optional version number
    expires // optional in hours
) 
session.setItem(key, value, version, expires)

// returns the value if not expired 
// and if matches the version number
local.getItem(
    key     // key to keep a refrence
    version // optional version number
)
session.getItem(key, version)

// returns true if key exists in storage
local.hasItem(
    key     // key to keep a refrence
)
session.hasItem(key)

// removed the item from storage
local.removeItem(
    key     // key to keep a refrence
)
session.removeItem(key)

// returns a list of all keys in the storage
local.getAllKeys()
session.getAllKeys()

// clears the entire storage. Be careful with this
// as other keys you are not aware of may be in storage.
local.clear()
session.clear()

```

## Releases

### Version 1.0.0
initial functionality.



![alt text](https://raw.githubusercontent.com/msalehisedeh/wizard-storage/master/sample.png  "What you would see when a wizard-storage sampler is used")
