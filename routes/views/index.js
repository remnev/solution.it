var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var locals = res.locals,
        view = new keystone.View(req, res),
        PortfolioProject = keystone.list('PortfolioProject');

    // Set locals
    locals.section = 'company';

    PortfolioProject.model
        .find()
        .where({ state: 'published' })
        .select('title image linkTo')
        .exec(function(err, portfolioProjects) {
            if (err) throw err;

            locals.portfolioProjects = portfolioProjects;

            // Render the view
            view.render('index');
        });

}
