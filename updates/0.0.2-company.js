var keystone = require('keystone'),
    Company = keystone.list('Company');

exports = module.exports = function(done) {
    var company = new Company.model({
        name: 'Solution IT'
    });

    company.save(function(err) {
        if (err) {
            console.error('Err:', err);
        } else {
            console.log("Added done");
        }
        done();
    });
};
