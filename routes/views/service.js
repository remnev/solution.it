var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {
    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'services';
    locals.serviceCategory = req.params.category;

    async.parallel({
        categories: getCategories,
        services: getServices
    }, function(err, results) {
        if (err) throw err;

        locals.categories = results.categories;
        locals.services = results.services;

        results.services.forEach(function(service) {
            if (service.slug == req.params.service) {
                locals.requiredService = service;
                return;
            }
        });
        // Render the view
        view.render('service');
    });

    function getCategories(cb) {
        keystone.list('ServiceCategory').model
            .find()
            .select('name slug')
            .sort({ priority: 1 })
            .exec(function(err, categories) {
                if (err) cb(err);

                cb(null, categories);
            });
    }

    function getServices(cb) {
        keystone.list('Service').model
            .find()
            .where({ state: 'published' })
            .select('name image content categories slug')
            .populate('serviceCategory categories')
            .sort({ priority: 1 })
            .exec(function(err, services) {
                if (err) cb(err);

                var res = [];
                services.forEach(function(service) {
                    if (service.categories[0].slug == locals.serviceCategory) {
                        res.push(service);
                    }
                });

                cb(null, res);
            });
    }

}
