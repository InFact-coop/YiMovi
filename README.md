Building a CMS-based website with a catalogue of films from the Chinese medical humanties field.

To build:
- Requires Node and MongoDB
- Clone and npm install
- Create `.env` file with the following:
    - MONGODB_URI: mongo DB url (locally this will look like: mongodb://localhost/{dbname})
    - COOKIE_SECRET: cookie secret (should be long)
    - ADMIN_EMAIL: email for admin account on keystone
    - ADMIN_PASSWORD: password for admin account on keystone
    - CLOUDINARY
- `npm run build_tachyons` to build css
- `node web` to run server
- admin UI is at /keystone

to backup restore the db you need a file called `mongo_config.json` in the root:
```json
{
  "host": "****",
  "database": "****",
  "user": "****",
  "password": "****"
}
```
you can get these out of the mongo connection string in the live heroku environment
https://docs.mongodb.com/manual/reference/connection-string/
