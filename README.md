# vui-multiservers-proxy
Proxy server adding multi servers access for Alexa and Google Action

## Deployment

### Prerequisites

1. MongoDB (> v4.0)

### Instructions

1. Clone the Repository

    `git clone https://github.com/RocketChat/vui-multiservers-proxy.git`
    
2. Install the dependencies

    `npm install`
    
3. Get URL of a running MongoDB instance and create a `.env` file. Following is a sample configuration. Alternatively you can also just paste the MongoDB URL in the `config.js` file.

    ```
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://
    ```
4. Run the server

    `node server`

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
  http://localhost:3000/user/data?qcode=348032

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
