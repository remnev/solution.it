var _ = require('underscore'),
    keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Users
 * =====
 */

var User = new keystone.List('User');

User.add({
    name: {
        type: Types.Name,
        required: true,
        index: true,
        label: 'Имя Фамилия'
    },
    email: {
        type: Types.Email,
        initial: true,
        required: true,
        index: true
    },
    password: {
        type: Types.Password,
        initial: true,
        required: false,
        label: 'Пароль'
    }
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Имеет доступ в админку' }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'author' });


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
