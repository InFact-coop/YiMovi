# About

YiMovi is a CMS-based website with a catalogue of films from the Chinese medical humanties field, built for UCL University.

## Build

Requirements for building locally: Node, MongoDB.

You'll need a mongo database (can be a local one) and a [Cloudinary](http://cloudinary.com/) account.

Steps:
- Clone this repo and run `npm install`
- Create `.env` file with the following:
    - MONGODB_URI: mongo DB url (locally this will look like: mongodb://localhost/{dbname})
    - COOKIE_SECRET: cookie secret (should be a long string)
    - ADMIN_EMAIL: email for admin account on keystone (the admin account will be set up for you when you run the app for the first time)
    - ADMIN_PASSWORD: password for admin account on keystone
    - CLOUDINARY: cloudinary environment variable, found on your Cloudinary dashboard
    - SITE_URL: URL for your site, e.g. on Heroku (defaults to http://0.0.0.0:3000/)
    - EMAIL: email address to which FormSpree responses will be sent
    - `node web` to start the server
    
## CSS

We are using Tachyons for our CSS. Custom CSS classes should be stored in the files in `/css`.

To generate a new minified CSS file with your custom classes, run `npm run build_tachyons`

You can watch changes to your CSS files with `npm run watch_tachyons`

## Using Keystone

YiMovi comes with an admin UI (provided by Keystone). To go to the admin UI and start adding data, navigate to `/keystone`in the browser

## Database

To backup / restore the db you need a file called `mongo_config.json` in the root:
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

## Deployment

We are using Heroku for deployment. Heroku is watching the branches 'staging' and 'production' branches for changes.

## Translation

The JSON files in the locales directory contain the relevant copy for the respsective English / Chinese language versions.

For more efficient localisation management, you can create a CSV file containing a copy of all translations from your locale files by running `node lib/parse_json_csv.js`

The CSV file can be opened with a spreadsheet tool (e.g. Libre Office). 

CSV files need to be saved with the following settings:
- Row delimiter: '\n'
- Field delimiter: ','
- All fields wrapped in "double quotes"

To turn a CSV file that's been edited back to JSON, run `node lib/parse_csv_json.js {PATH_TO_CSV}`

Note: this will overwrite your existing locale files! Best practice would be to check out a new branch before making these changes.

