Building a CMS-based website with a catalogue of films from the Chinese medical humanties field, built for UCL University.

To build this project locally:
Requirements: Node, MongoDB

You'll need a mongo database (can be a local one) and a [Cloudinary](http://cloudinary.com/) account.

Steps:
- Clone this repo and run `npm install`
- Create `.env` file with the following:
    - MONGODB_URI: mongo DB url (locally this will look like: mongodb://localhost/{dbname})
    - COOKIE_SECRET: cookie secret (should be a long string)
    - ADMIN_EMAIL: email for admin account on keystone (the admin account will be set up for you when you run the app for the first time)
    - ADMIN_PASSWORD: password for admin account on keystone
    - CLOUDINARY: cloudinary environment variable, found on your Cloudinary dashboard
- `npm run build_tachyons` to build css
- `node web` to start the server

To go to the admin UI and start adding data, navigate to `/keystone`in the browser

to backup / restore the db you need a file called `mongo_config.json` in the root:
```json
{
  "host": "****",
  "database": "****",
  "user": "****",
  "password": "****",
  "source_DB": "***"
}
```
you can get these out of the mongo connection string in the live heroku environment
https://docs.mongodb.com/manual/reference/connection-string/

`source_DB` is for backups only, and specifies the name of the folder in your root directory where the backup can be found.

An existing backup can be found here: https://github.com/infact-coop/yimovi-resources

