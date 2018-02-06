const keystone = require('keystone');
const Types = keystone.Field.Types;

const fileStorage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-azure'),
  azure: {
    accountName: process.env.AZURE_STORAGE_ACCOUNT,
    accountKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    container: process.env.AZURE_STORAGE_CONTAINER,
    generateFilename: keystone.Storage.randomFilename, // default
  },
  schema: {
    container: true, // optional; store the referenced container in the database
    etag: true, // optional; store the etag for the resource
    url: true, // optional; generate & store a public URL
  },
});

const Resource = new keystone.List('Resource', {
  autokey: { from: 'name', path: 'key', unique: true, },
  label: 'Resources',
  sortable: true,
});

Resource.add({
  name: { type: String, required: true, },
  summary: { type: String, },
  resources: { type: Types.File, storage: fileStorage, },
});

Resource.track = true;
Resource.register();
