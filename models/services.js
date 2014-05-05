var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Service = new keystone.List('Service');

Service.add({
    name: {
        type: String,
        index: true,
        required: true,
        label: 'Название'
    },
    slug: {
        type: String,
        initial: true,
        required: true,
        label: 'Название в URL (service_SLUG)',
        note: '/services/[category_SLUG]/[service_SLUG]/ Без пробелов!'
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        index: true,
        label: 'Состояние'
    },
    image: {
        type: Types.CloudinaryImage,
        label: 'Картинка'
    },
    content: {
        brief: {
            type: Types.Html,
            wysiwyg: true,
            height: 100,
            label: 'Спойлер',
            note: 'Короткий текст. После него следует ссылка Подробнее'
        },
        extended: {
            type: Types.Html,
            wysiwyg: true,
            height: 300,
            label: 'Полное описание'
        }
    },
    categories: {
        type: Types.Relationship,
        ref: 'ServiceCategory',
        many: true,
        initial: true,
        required: true,
        label: 'Категория'
    },
    showOnIndexPage: {
        type: Types.Boolean,
        label: 'Вывести на главную'
    },
    date: {
        type: Types.Date,
        index: true,
        label: 'Дата создания'
    }
});

Service.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Service.register();
