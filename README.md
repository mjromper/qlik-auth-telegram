# Qlik Sense Authentication module with Telegram

Qlik Sense NodeJs module to authenticate with Telegram in Qlik Sense.

## Setup step by step
---
### Using Telepass.me
1. First of all you need to sign in to telepass.me, register your application and obtain the APP_ID and APP_SECRET.

![](https://github.com/mjromper/qlik-auth-telegram/raw/master/docs/images/createapp.png)

2.Set the set the redirect URI. Select a port number at your choice (different from the ones already in used by Qlik Sense). **http://your_sense_server_host:9999/oauth2callback**

![](https://github.com/mjromper/qlik-auth-telegram/raw/master/docs/images/webapplicationredirect.png)


### Installation of this module

* Launch PowerShell in Administrator mode (right-click and select Run As Administrator)
* Create and change directory to an empty directory, i.e. C:\TelegramTemp

```powershell
    mkdir \TelegramTemp; cd \TelegramTemp
```

* Enter the below command exactly as it is (including parentheses):

```powershell
    (Invoke-WebRequest "https://raw.githubusercontent.com/mjromper/qlik-auth-telegram/master/setup.ps1" -OutFile setup.ps1) | .\setup.ps1
```

This will download and execute the setup script.

When the downloading and installation of the modules including their dependencies are finished you will be prompted for some configuration options.

```
Enter name of user directory [TELEGRAM]:
Enter port [9999]:
Application ID []: enter your **APP_ID** value
Client Secret []: enter your **APP_SECRET** value
```

- ***port***: *the same used for the redirect URI at the Microsoft Application Registration Portal*
- ***directory***: *give a name for the Directory in Qlik Sense where you users will be authorized*

When the script is finished you need to restart Qlik ServiceDispacher service.

### Qlik Sense Virtual Proxy
1. Create a new Virtual Proxy in QMC
2. For Authentication module redirect URI enter the same ***servername*** and ***port*** you used for Authorized redirect URL in you app configuration in Telepass.me

![](https://github.com/mjromper/qlik-auth-telegram/raw/master/docs/images/virtual-proxy.png)
3. Finish the Virtual Proxy configuration. The proxy will restart and the new module should be good to go!. Open the url https://your_sense_server_host/telegram (where 'telegram' is the prefix of virtual proxy)

### Todos
 - Write Tests

License
----

MIT
