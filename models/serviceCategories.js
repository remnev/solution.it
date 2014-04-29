var keystone = require('keystone'),
    Types = keystone.Field.Types;

var ServiceCategory = new keystone.List('ServiceCategory', {
    autokey: { from: 'name', path: 'key' }
});

ServiceCategory.add({
    name: {
        type: String,
        required: true,
        label: 'Название'
    },
    slug: {
        type: String,
        initial: true,
        required: true,
        label: 'Название в URL (category_SLUG)',
        note: '/services/[category_SLUG]/ Без пробелов!'
    },
    showOnIndexPage: {
        type: Types.Boolean,
        label: 'Вывести на главную'
    },
    showAsDefaultCategory: {
        type: Types.Boolean,
        label: 'По умолчанию (Хотя бы одна категория должна иметь эту галку)',
    },
    priority: {
        type: Number,
        label: 'Приоритет для сортировки'
    }
});

ServiceCategory.relationship({ ref: 'Service', path: 'categories' });

ServiceCategory.register();
