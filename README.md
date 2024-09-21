# firefox
Firefox browser with google voice integration

## docker compose
```
services:
  firefox:
    image: jindongh/firefox:latest
    container_name: firefox
    environment:
      - FIREFOX_CLI=https://voice.google.com
      - DOCKER_MODS=linuxserver/mods:universal-package-install
      - INSTALL_PACKAGES=font-noto-cjk
      - LC_ALL=en_US.UTF-8
    ports:
      - 3000:3000
      - 8080:8080
```
## usage
* Start the server
* Login https://voice.google.com
* Add greasemonkey script, copy from /gvoice.user.js
* The script will scan the open sms window, and post incoming message to 8080
* The sms can be accessed with 8080: `curl localhost:8080`
