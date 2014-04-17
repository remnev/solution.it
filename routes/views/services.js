var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {
    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'services';
    locals.serviceCategory = req.params.category || 'network-integration';

    async.parallel({
        categories: getCategories,
        services: getServices
    }, function(err, results) {
        if (err) throw err;

        locals.categories = results.categories;
        locals.services = results.services;
        // Render the view
        view.render('services');
    });

    function getCategories(cb) {
        keystone.list('ServiceCategory').model
            .find()
            .select('name slug')
            .exec(function(err, categories) {
                if (err) cb(err);

                cb(null, categories);
            });
    }

    function getServices(cb) {
        keystone.list('Service').model
            .find()
            .where({ state: 'published' })
            .select('name image content categories')
            .populate('serviceCategory categories')
            .exec(function(err, services) {
                if (err) cb(err);

                cb(null, services);
            });
    }

}
