var keystone = require('keystone'),
    PortfolioProject = keystone.list('PortfolioProject');

exports = module.exports = function(done) {
    var portfolioProject = new PortfolioProject.model({
        title: 'ООО Газпром нефть — внедрение ИС учета сырья'
    });

    portfolioProject.save(function(err) {
        if (err) {
            console.error('Err:', err);
        } else {
            console.log("Added done");
        }
        done();
    });
};
