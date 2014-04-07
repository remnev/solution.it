var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * PortfolioProject
 * =====
 */

var PortfolioProject = new keystone.List('PortfolioProject');

PortfolioProject.add({
    name: { type: String, required: true },
    title: { type: String },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    image: { type: Types.CloudinaryImage },
    linkTo: { type: Types.Url },
    date: { type: Types.Date, index: true }
});

/**
 * Registration
 */

PortfolioProject.register();
