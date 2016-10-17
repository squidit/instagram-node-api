# instagram-node-api [![Build Status](https://travis-ci.org/limafelipe/instagram-node-api.svg?branch=master)](https://travis-ci.org/limafelipe/instagram-node-api)
**BETA** - A node wrapper to [Instagram API](https://www.instagram.com/developer/endpoints/) 😄

## Status
[**GET** /users/self/media/recent](https://www.instagram.com/developer/endpoints/users/#get_users_media_recent_self) ➡️ *In development*.

Another's coming soon.

## Usage
`npm install --save instagram-node-api`

```js
const const InstagramNodeApi = require('instagram-node-api');

const instagramNodeApi = new InstagramNodeApi(YOUR_ACCESS_TOKEN);
instagramNodeApi.usersSelfMediaRecent();

instagramNodeApi.on('data', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('finish', (data, pagination, meta, remaining, limit, result) => {
});

instagramNodeApi.on('error', (error) => { });
```

## Tests
Include a `.env` file with:

```
TEST_INSTAGRAM_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

And just run `npm test`

## Contributing
Currently this is very basic for my needs, PRs are welcome 🙏
