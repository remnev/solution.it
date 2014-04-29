var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
    nocreate: true,
    noedit: true
});

Enquiry.add({
    name: {
        type: Types.Name,
        required: true,
        label: 'Имя'
    },
    email: { type: Types.Email, required: true },
    phone: { type: String, label: 'Телефон' },
    enquiryType: {
        type: Types.Select,
        label: 'Тип сообщения',
        options: [
            { value: 'message', label: "Просто сообщение" },
            { value: 'question', label: "Вопрос" },
            { value: 'other', label: "Прочее" }
        ]
    },
    message: {
        type: Types.Markdown,
        required: true,
        label: 'Текст сообщения'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        label: 'Дата отправки'
    }
});

Enquiry.schema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
})

Enquiry.schema.post('save', function() {
    if (this.wasNew) {
        this.sendNotificationEmail();
    }
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
    var enqiury = this;

    keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

        if (err) return callback(err);

        new keystone.Email('enquiry-notification').send({
            to: admins,
            from: {
                name: 'solutionit.ru',
                email: 'contact@solutionit.ru'
            },
            subject: 'Новое сообщение solutionit.ru',
            enquiry: enqiury
        }, callback);

    });
}

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
