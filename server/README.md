# API
## Details
All requests must provide `Authorization` with appropriate token value unless stated

## GET Definitions

### Users
Fetches user information
```javascript
/GET /users/:id
{
  "id": "User id as string",
  "fname": "Cheyan",
  "lname": "Setayesh",
  "phone number": "Phone number as string",
  "email": "Email",
  "picture": "Url for picture relative to server",
  "friends": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ]
}
```

Fetches list of basic party information
```javascript
/GET /users/:id/parties
{
  "parties": [
    {
      "id": "Party id as string",
      "title": "Party title",
      "datetime": "Date time",
      "host": "Host Name",
      "status": "User attending status"
    }
  ]
}
```

### Parties

Fetches detailed party information
```javascript
/GET /parties/:id
{
  "id": "Party id as string",
  "title": "Party title",
  "description": "(Nullable) Party description",
  "private_status": "Party privacy status",
  "address": "Street Address",
  "city": "City",
  "zip": "Zipcode as string",
  "state": "State abbreviation",
  "country": "Country abbreviation",
  "datetime": "Date time",
  "host": "Host Name",
  "attending": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ],
  "invited": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ],
  "declined": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ],
  "complaints": [
    {
      "datetime": "Date Time",
      "message": "(Nullable) Message"
    }
  ],
  "supplies": [
    {
      "id": "Supply id as string",
      "name": "First Name",
      "picture": "Url for picture relative to server",
      "claimed_by": "(Nullable) Who currently claims supply item as string"
    }
  ]
}
```


Fetches parties around user

* Required headers:
`Longitude`,
`Latitude`

* Does not require:
`Authorization`

```javascript
/GET /parties/nearby
{
  "complaints": [
    {
      "id": "Party id as string",
      "address": "Street Address",
      "city": "City",
      "state": "State abbreviation",
      "zip": "Zipcode as string"
    }
  ]
}
```

### Search

Searches for user
```javascript
/GET /search/:id/user?Name=name
{
  "friends": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ],
  "others": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "picture": "Url for picture relative to server"
    }
  ]
}
```

Searches for supply
```javascript
/GET /search/supplies?Name=name
{
  "supplies:": [
    {
      "id": "Suppply id as string",
      "name": "First Name",
      "picture": "Url for picture relative to server"
    }
  ]
}
```

### Admin
Fetches admin information
```javascript
/GET /admin
{
  "parties": [
    {
      "id": "Party id as string",
      "title": "Party title",
      "description": "(Nullable) Party description",
      "private_status": "Party privacy status",
      "address": "Street Address",
      "city": "City",
      "zip": "Zipcode as string",
      "state": "State abbreviation",
      "country": "Country abbreviation",
      "datetime": "Date time",
      "host id": "Host id as string",
      "host": "Host Name",
      "attending": [
        {
          "id": "User id as string",
          "fname": "First Name",
          "lname": "Last Name",
          "picture": "Url for picture relative to server"
        }
      ],
      "invited": [
        {
          "id": "User id as string",
          "fname": "First Name",
          "lname": "Last Name",
          "picture": "Url for picture relative to server"
        }
      ],
      "declined": [
        {
          "id": "User id as string",
          "fname": "First Name",
          "lname": "Last Name",
          "picture": "Url for picture relative to server"
        }
      ],
      "complaints": [
        {
          "datetime": "Date Time",
          "message": "(Nullable) Message"
        }
      ],
      "supplies": [
        {
          "id": "Supply id as string",
          "name": "First Name",
          "picture": "Url for picture relative to server",
          "claimed_by": "(Nullable) Who currently claims supply item as string"
        }
      ]
    }
  ],
  "users": [
    {
      "id": "User id as string",
      "fname": "First Name",
      "lname": "Last Name",
      "phone number": "Phone number as string",
      "email": "Email",
      "picture": "Url for picture relative to server",
      "friends": [
        {
          "id": "User id as string",
          "fname": "First Name",
          "lname": "Last Name",
          "picture": "Url for picture relative to server"
        }
      ]
    }
  ]
}
```
## POST Definitions

### Users
Create new user
* Does not require:
`Authorization`

```javascript
/POST /users/:id
{
  "fname": "First Name",
  "lname": "Last Name",
  "phone number": "Phone number as string",
  "email": "Email",
  "picture": "Url for picture relative to server",
  "friends": [
    "User id as string"
  ]
}
```

### Parties

Create new party
```javascript
/POST /parties
{
  "id": "User id as string",
  "title": "Party title",
  "description": "(Nullable) Party description",
  "private_status": "Party privacy status",
  "address": "Street Address",
  "city": "City",
  "zip": "Zipcode as string",
  "state": "State abbreviation",
  "country": "Country abbreviation",
  "date": "Date",
  "time": "Time",
  "invited": [
    "User id as string"
  ],
  "supplies": [
    "Supply id as string"
  ]
}
```

### Complaints
Create a new complaint
```javascript
/POST /complaints
{
  "id": "Party id as string",
  "datetime": "Date Time",
  "message": "(Nullable) Message"
}
```

## PUT Definitions

### Users
Update user information
```javascript
/PUT /users/:id
{
  "id": "User id as string",
  "fname": "First Name",
  "lname": "Last Name",
  "phone number": "Phone number as string",
  "email": "Email",
  "picture": "Url for picture relative to server",
  "friends": [
    "User id as string"
  ]
}
```

### Parties
Update privacy status 
```javascript
/PUT /parties/:id/private_status
{
  "private": "Boolean as string"
}
```

Update invited users
```javascript
/PUT /parties/:id/invited
{
  "invited": [
    "User id as string"
  ]
}
```

Update requested supplies
```javascript
/PUT /parties/:id/supplies
{
  "supplies": [
    "Supply id as string"
  ]
}
```

## DELETE Defintions
Delete party
```javascript
/DELETE /parties/:id
```

Delete user
```javascript
/DELETE /users/:id
```
