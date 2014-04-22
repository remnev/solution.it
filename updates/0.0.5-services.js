var keystone = require('keystone'),
    async = require('async'),
    Service = keystone.list('Service'),
    services = [
        { name: 'СКС/ЛВС', slug: 'sks-lvs' },
        { name: 'Вычислительная инфраструктура', slug: 'vich-infr' }
    ];

function createService(service, done) {
    var newservice = new Service.model(service);

    newservice.save(function(err) {
        if (err) {
            console.error("Error adding service " + service.name + " to the database:");
            console.error(err);
        } else {
            console.log("Added service " + service.name + " to the database.");
        }
        done();
    });
}

exports = module.exports = function(done) {
    async.forEach(services, createService, done);
};
