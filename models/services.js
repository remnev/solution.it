var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Service = new keystone.List('Service');

Service.add({
    name: { type: String, index: true, required: true },
    slug: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 100 },
        extended: { type: Types.Html, wysiwyg: true, height: 300 }
    },
    categories: { type: Types.Relationship, ref: 'ServiceCategory', many: true },
    showOnIndexPage: { type: Types.Boolean },
    date: { type: Types.Date, index: true }
});

Service.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Service.register();
