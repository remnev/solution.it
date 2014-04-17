var keystone = require('keystone'),
    async = require('async'),
    ServiceCategory = keystone.list('ServiceCategory'),
    serviceCategories = [
        { name: 'Сетевая интеграция', slug: 'network-integration' },
        { name: 'Инженерные системы', slug: 'engeneering-system' },
        { name: 'ИТ аутсорсинг', slug: 'it-outsourcing' },
        { name: 'Информационная безопасность', slug: 'information-security' },
        { name: 'Телефония', slug: 'telephony' },
        { name: 'СКУД, видеонаблюдение', slug: 'skud' }
    ];

function createServiceCategory(serviceCategory, done) {
    var newserviceCategory = new ServiceCategory.model(serviceCategory);

    newserviceCategory.save(function(err) {
        if (err) {
            console.error("Error adding serviceCategory " + serviceCategory.name + " to the database:");
            console.error(err);
        } else {
            console.log("Added serviceCategory " + serviceCategory.name + " to the database.");
        }
        done();
    });
}

exports = module.exports = function(done) {
    async.forEach(serviceCategories, createServiceCategory, done);
};
