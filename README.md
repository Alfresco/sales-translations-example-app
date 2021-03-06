# Sales Translations Example App

Example app utilising the Alfresco [Angular2 components](https://github.com/Alfresco/alfresco-ng2-components). Translate sales collateral via a process and view translated material.

## Prerequisites

Before you start using this app, make sure you have installed all required software and done all the 
necessary configuration, see the [prerequisites](PREREQUISITES.md).

## Configuring Alfresco and Activiti

Follow the steps in [setup steps](SETUP.md) which detail how to set up the correct data in Alfresco ECM
and Activiti before you run the application.

## Building and running

Install dependencies

```sh
npm install
```

Fast build and watch for dev purposes

```sh
npm start
```

The `npm start` script also includes live reload and watchers for all the `.ts` files.
TypeScript watchers are also configured for `node_modules` folder within demo shell
and provide live reload for all the component libraries as well.

## Customising the app

### Add languages
To support a new language you need to create your language file (.json) and add it to `i18n/` folder.

```json
{
        "username" : "Username",
        "input-required-message": "Required",
        "input-min-message": "Your username needs to be at least 4 characters.",
        "login-button": "Login"
}
```

Directory structure:
```
.
├── i18n/
│   ├── en.json
│   ├── it.json
│   └── fr.json
```


## History

For detailed changelog, check [Releases](https://github.com/Alfresco/sales-translations-example-app/releases).

## Contributors

[Contributors](https://github.com/Alfresco/sales-translations-example-app/graphs/contributors)

