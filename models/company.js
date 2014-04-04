var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Company
 * =====
 */

var Company = new keystone.List('Company');

Company.add({
    name: { type: Types.Text },
    email: { type: Types.Email },
    phone: {
        code: { type: Types.Number },
        number: { type: Types.Text }
    },
    workTime: {
        days: { type: Types.Text },
        time: { type: Types.Text }
    },
    motto: { type: Types.Text },
    description: { type: Types.Textarea },
    address: {
        postCode: { type: Types.Number },
        city: { type: Types.Text },
        street: { type: Types.Text },
        description: { type: Types.Text }
    },
    welcomeText: { type: Types.Text }
});

/**
 * Registration
 */

Company.register();
