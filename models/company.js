var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Company
 * =====
 */

var Company = new keystone.List('Company');

Company.add({
    name: {
        type: Types.Text,
        label: 'Название'
    },
    email: { type: Types.Email },
    phone: {
        code: {
            type: Types.Number,
            label: 'Код города'
        },
        number: {
            type: Types.Text,
            label: 'Номер телефона'
        }
    },
    workTime: {
        days: {
            type: Types.Text,
            label: 'Дни работы'
        },
        time: {
            type: Types.Text,
            label: 'Время работы'
        }
    },
    motto: {
        type: Types.Text,
        label: 'Слоган компании'
    },
    aboutCompany: {
        type: Types.Markdown,
        label: 'О компании'
    },
    address: {
        postCode: { type: Types.Text, label: 'Индекс' },
        city: { type: Types.Text, label: 'Город' },
        street: { type: Types.Text, label: 'Улица, дом, офис' },
        description: { type: Types.Text, label: 'Описание как добраться' }
    },
    welcomeText: { type: Types.Text, label: 'Приветственный текст' }
});

/**
 * Registration
 */

Company.register();
