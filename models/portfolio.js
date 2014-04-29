var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * PortfolioProject
 * =====
 */

var PortfolioProject = new keystone.List('PortfolioProject');

PortfolioProject.add({
    name: {
        type: String,
        required: true,
        label: 'Название'
    },
    title: {
        type: String,
        label: 'Заголовок слайда'
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
    linkTo: {
        type: Types.Url,
        label: 'Ссылка при клике на слайд',
        note: 'Пока не работает'
    },
    date: {
        type: Types.Date,
        index: true,
        label: 'Дата создания'
    }
});

/**
 * Registration
 */

PortfolioProject.register();
