(function() {
    const keyButtons = $('div.key-row > div');
    const fingerboard = $('#fbd');
    const keyNameDiv = $('#key-name');

    const keyGroups = [
        ['0s', '0f'],
        ['6s', '6f'],
        ['5s', '7f'],
        ['7s', '5f'],
    ];

    const toMajorKey = {
        '0s': 'C major',
        '1s': 'G major',
        '2s': 'D major',
        '3s': 'A major',
        '4s': 'E major',
        '5s': 'B major',
        '6s': 'F-sharp major',
        '7s': 'C-sharp major',
        '0f': 'C major',
        '1f': 'F major',
        '2f': 'B-flat major',
        '3f': 'E-flat major',
        '4f': 'A-flat major',
        '5f': 'D-flat major',
        '6f': 'G-flat major',
        '7f': 'C-flat major',
    };

    keyButtons.on('click', function(event) {
        const targetDiv = $(this);
        const key = targetDiv.children('img').attr('alt');
        fingerboard.attr('class', `key-${key}`)
        keyButtons.removeClass('active');
        targetDiv.addClass('active');

        for (const group of keyGroups) {
            if (group.includes(key)) {
                for (const alternativeKey of group) {
                    $(`div.key-row > div > img[alt="${alternativeKey}"]`).parent().addClass('active');
                }
            }
        }

        keyNameDiv.html(toMajorKey[key]);
    });

    $(keyButtons).first().trigger('click');
})();