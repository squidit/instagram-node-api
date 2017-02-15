# instagram-node-api [![Build Status](https://travis-ci.org/squidit/instagram-node-api.svg?branch=master)](https://travis-ci.org/squidit/instagram-node-api) ![[Depencies status](https://david-dm.org/squidit/instagram-node-api/)](https://david-dm.org/squidit/instagram-node-api.svg)

**BETA** - A node wrapper to [Instagram API](https://www.instagram.com/developer/endpoints/) 😄

## Status
- [**GET** /users/self](https://www.instagram.com/developer/endpoints/users/#get_users_self) ➡️ *In development*.
- [**GET** /users/self/media/recent](https://www.instagram.com/developer/endpoints/users/#get_users_media_recent_self) ➡️ *In development*.
- [**GET** /tags/*tag-name*/media/recent](https://www.instagram.com/developer/endpoints/tags/#get_tags_media_recent) ➡️ *In development*.

Another's coming soon.

## Usage
`npm install --save instagram-node-api`

```js
const InstagramNodeApi = require('instagram-node-api');

const instagramNodeApi = new InstagramNodeApi(YOUR_ACCESS_TOKEN);

instagramNodeApi.on('data', ([*]) => { });
instagramNodeApi.on('finish', ([*]) => { });
instagramNodeApi.on('err', (error) => { });
```

## Users
#### Get information about the owner of the access_token.
```js
instagramNodeApi.usersSelf();

instagramNodeApi.on('data', (profile, meta, remaining, limit, result) => {
});

instagramNodeApi.on('finish', (profile, meta, remaining, limit, result) => {
});
```

#### Get the most recent media published by the owner of the access_token..
```js
instagramNodeApi.usersSelfMediaRecent();

instagramNodeApi.on('data', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('err', (error) => { });
```

## Tags
#### Get the most recent media published by the owner of the access_token..
```js
instagramNodeApi.tagsMediaRecent(tagName, [dateLimit = null], [limit = 0]);

instagramNodeApi.on('data', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('err', (error) => { });
``` 

- **tagName**: *String* 
- **dateLimit**: *Date*


## Tests
Include a `.env` file with:

```
TEST_INSTAGRAM_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

And just run `npm test`

## Contributing
Currently this is very basic for my needs, PRs are welcome 🙏
