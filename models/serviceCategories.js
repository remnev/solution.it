var keystone = require('keystone'),
    Types = keystone.Field.Types;

var ServiceCategory = new keystone.List('ServiceCategory', {
    autokey: { from: 'name', path: 'key' }
});

ServiceCategory.add({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    showOnIndexPage: { type: Types.Boolean },
    priority: { type: Number }
});

ServiceCategory.relationship({ ref: 'Service', path: 'categories' });

ServiceCategory.register();
