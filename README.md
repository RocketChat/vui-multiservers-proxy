# rc-alexa-multiserverproxy

## To Register User:

**CURL Command:**

```

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"serverurl": "https://bots.rocket.chat","servername":"bots","userid":"FpaaN9jwwJT9t","token":"E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3"}' \
  http://localhost:3000/register

```
**Expected Response** 

```

{
    "code": 670181,
    "expiry": 5,
    "status": true
}

```

## Get User Data:

**CURL Command:**

```

curl --header "Content-Type: application/json" \
  --request GET \
  --data '{"qcode":"778964"}' \
  http://localhost:3000/user/data

```
**Expected Response** 

```

{
    "data": {
        "serverinfo": {
            "serverurl": "https://bots.rocket.chat",
            "servername": "bots"
        },
        "headers": {
            "X-Auth-Token": "FpaaN9jwwJT9t",
            "X-User-Id": "E6XKwshBE0NRHQzdlw6XDnUQdZumpTfP8R3c"
        },
        "_id": "551729",
        "expireAt": "2019-07-20T17:43:50.110Z",
        "__v": 0
    },
    "status": true
}

```
