$(function() {
    $form = $('.contact-form'),
    $status = $('.contact-form__status');

    $form.on('submit', function(e) {
        $form.children('[name="action"]').val('contac');

        $.post('/contact', $form.serialize())
            .done(function(data) {
                if (data.err) {
                    console.log(data);
                    $status.text('Форма не была отправлена. Исправьте ошибки и попробуйте снова.');
                    for (var err in data.err) {
                        $form.find('input[name="'+err+'"]').parent('.form-group').addClass('has-error');
                    }
                } else {
                    $status.text('Ваша заявка успешно отправлена');
                }
            })
            .error(function(err) {
                console.log(err);
            });

        return false;
    });
});