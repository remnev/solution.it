var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {
    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'company';

    async.parallel({
        categories: getCategories,
        services: getServices,
        portfolioProjects: getPortfolioProjects
    }, function(err, results) {
        if (err) throw err;

        locals.categories = results.categories;
        locals.services = results.services;
        locals.portfolioProjects = results.portfolioProjects;

        // Render the view
        view.render('index');
    });

    function getCategories(cb) {
        keystone.list('ServiceCategory').model
            .find()
            .where({ showOnIndexPage: true })
            .select('name slug')
            .sort({ priority: 1 })
            .exec(function(err, categories) {
                if (err) cb(err);

                // не более 5 категорий на главной странице
                cb(null, categories.slice(0, 5));
            });
    }

    function getServices(cb) {
        keystone.list('Service').model
            .find()
            .where({ state: 'published', showOnIndexPage: true })
            .select('name image content categories slug')
            .populate('serviceCategory categories')
            .exec(function(err, services) {
                if (err) cb(err);

                // не более 5 услуг в категории
                cb(null, services.slice(0, 5));
            });
    }

    function getPortfolioProjects(cb) {
        keystone.list('PortfolioProject').model
            .find()
            .where({ state: 'published' })
            .select('title image linkTo')
            .exec(function(err, portfolioProjects) {
                if (err) cb(err);

                cb(null, portfolioProjects);
            });
    }

}
