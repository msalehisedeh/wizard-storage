# Welcome to Wizard Storage!

Have you ever been in need of using localStorage or sessionStorage in a more intelligent way? Have you thought of having an expiring storage data or a data tied up with a version number? This wizard allows you to just do that.

You can use this wizard to listen to changing of a specific key you have stored in storage. You can set a version number on a key and get the value only if correct version is supplied when retrieving data. Or set a time to expire the key in x number of hours. You can also listen to storage value changes made by other applications by using the WizardStorageDirective. You can have the wizard set default values for your keys or have the values encrypted for added security.

**I appreciate comments and ideas to make this tool versatile.**

**NOTE:** Starting with version 1.2.3 all previous versions are deprecated and you need to import this library through @sedeh/wizard-storage. Future bug fixes / enhancements will be on @sedeh scope.

[Live Demo](https://stackblitz.com/edit/wizard-storage?file=src%2Fapp%2Fapp.component.ts) | 
[NPM](https://www.npmjs.com/package/@sedeh/wizard-storage) | 
[Comments/Requests](https://github.com/msalehisedeh/wizard-storage/issues)

### Using the directive

```javascript
// load this directive on any tag. Here I do it on a div tag
// the event is on localStorage change by other applications.
<div (wizardStorage)="onStorageChange($event)"></div>

```


### Methods and arguments

```javascript
constructor(private storage:WizardStorageService){}

// return true if storage is supported by the browser
storage.local.isSupported() 
storage.session.isSupported() 
storage.cookies.isSupported() // always true

// returns an observer to subscribe to.
// To listen to storage change internally by other
// parts of your application, use this method.
storage.local.onchange(
    key // key to keep a reference
)
storage.session.onchange(
    key // key to keep a reference
) 
storage.cookies.onchange(
    key // key to keep a reference
) 

// sets the value of key in storage tied up with 
// expiration and or version number if supplied.
storage.local.setItem(
    key     // key to keep a reference
    value   // value to be stored
    version // optional version number
    expires // optional in hours
    isSecure // optional should encrypt value: true/false or undefined
) 
storage.session.setItem(
    key     // key to keep a reference
    value   // value to be stored
    version // optional version number
    expires // optional in hours
    isSecure // optional should encrypt value: true/false or undefined
)
storage.cookies.setItem(
    key       // key to keep a reference
    value     // value to be stored
    expires   // optional in hours
    domain    // optional
    path      // optional
    isSecure  // optional
)

// returns the value if not expired 
// and if matches the version number
// If options is string, it will be considered as version number to support backward compatibility with previous versions
// If Obtions is JSON, it will be {version?, default?, isSecure?}
// If defalut value is supplied, it will be stored when item do not exist.
storage.local.getItem(
    key     // key to keep a reference
    options // optional options
)
storage.session.getItem(
    key     // key to keep a reference
    options // optional options
)
storage.cookies.getItem(
    key     // key to keep a reference
)

// returns true if key exists in storage
storage.local.hasItem(
    key     // key to keep a reference
)
storage.session.hasItem(
    key     // key to keep a reference
)
storage.cookies.hasItem(
    key     // key to keep a reference
)

// removed the item from storage
storage.local.removeItem(
    key     // key to keep a reference
)
storage.session.removeItem(
    key     // key to keep a reference
)
storage.cookies.removeItem(
    key
    path // optional
    domain // optional
)

// returns a list of all keys in the storage
storage.local.getAllKeys()
storage.session.getAllKeys()
storage.cookies.getAllKeys()

// clears the entire local storage. Be careful with this
// as other keys you are not aware of may be 
// created by other applications in local storage.
storage.local.clear()

// clearing session storage is OK as it contains
// keys stored only by your application.
storage.session.clear()

// clears the entire cookies storage for your document. 
storage.cookies.clear()

```

## Releases
|Version|Description                                                             |
|-------|------------------------------------------------------------------------|
| 3.0.0 |Angular 15 upgrade.                                                     |
| 2.1.2 |Somehow stacblitz is not able to find version 2.1.1. Re-packaging in hope the problem will go away.|
| 2.1.1 |Fixed logic in retreiving stored default and stored secure contents.    |
| 2.1.0 |Added ability to get item value with substituded default value if item do not exist in storage. Added ability to encrypt content. |
| 2.0.0 |Angular 8 upgrade.                                                      |
| 1.2.5 |Nullpointer fix.                                                        |
| 1.2.4 |Fix logic with getItem which was returning added json item as a string. |
| 1.2.3 |Fix dependencies.                                                       |
| 1.2.2 |Documentation update. Also noticed i was issuing onchange too early.    |
| 1.2.1 |Documentation update.                                                   |
| 1.2.0 | **Added cookies API to make this tool a bit sweeter ;-).** When listening to localStorage event raised by other applications, the event has url attribute and contains detailed information about an entry exactly as it was added into the storage. Modified code to pass url attribute and detailed value to the onchange observer. |
| 1.1.2 |I was getting a compiler error on stackblitz. dropped my node_modules and recompiled. found i had forgotten to export directive. also noticed my local application was having problem when using angular 5 since i am comiling this tool in angular 6. |
| 1.1.1 |Documentation update.                                                   |
| 1.1.0 |Added WizardStorageDirective.                                           |
| 1.0.0 |Initial functionality release.                                          |



![alt text](https://raw.githubusercontent.com/msalehisedeh/wizard-storage/master/sample.png  "What you would see when a wizard-storage sampler is used")

![alt text](https://raw.githubusercontent.com/msalehisedeh/wizard-storage/master/sample2.png  "What you would see when a wizard-storage sampler is used")
