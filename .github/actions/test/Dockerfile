FROM singli/mongonode:latest

LABEL "com.github.actions.name"="Server test"
LABEL "com.github.actions.description"="Test proxy server"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/sing-li/testaction"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="Sing Li <sing.li@rocket.chat>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
