# Webhook Shop Service
An application where users can subscribe and unsubscribe on an event called `purchased_confirmed`. It uses a simple JSON file (`data.json`) to store subscribed URLs for valid events.  

The application has three endpoints the user can use to interact with the service:
- `POST` `/webhook` - {"url": String, "event": String} - Registrate a given URL to a given event.
- `DELETE` `/webhook` - {"url": String, "event": String} - Unregistrate a given URL from a given event.
- `POST` `/ping` - {...} - Sends a request to all URLs subscribed to the `purchased_confirmed` event.

# Integrator Documentation
[Google Docs Document](https://docs.google.com/document/d/1kgYkYe18bapqxWUo5ZxMqCzWig4CxjTppvMt1Lkoaw0/edit?usp=sharing)

# Install
```
$ npm install
```

# Usage
```
$ npm start
```
