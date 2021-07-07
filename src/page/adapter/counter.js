(() => {
    let btnIncrement = $('#increment-btn');
    let btnDecrement = $('#decrement-btn');
    let btnReset = $('#reset-btn');
    let divCtrOutput = $('#counter-output');

    const reservedUIElements = [btnIncrement, btnDecrement, btnReset];

    let ctr = 0;

    updateCtrUI();

    function increment() {
        ctr++;
        updateCtrUI();
    }

    function decrement() {
        if (ctr > 0) {
            ctr--;
        }

        updateCtrUI();
    }

    function reset() {
        ctr = 0;
        updateCtrUI();
    }

    function updateCtrUI() {
        divCtrOutput.html(ctr + '');

        btnDecrement.prop("disabled", ctr <= 0);
        btnReset.prop("disabled", ctr <= 0);
    }

    btnIncrement.on('click', increment);
    btnDecrement.on('click', decrement);
    btnReset.on('click', reset);

    $('body').keyup(e => {
        // hotkey is disabled, if an element is in the focus
        // that is to prevent the element to be 'clicked' through the spacebar
        // which could lead for example to a double increment
        if (reservedUIElements.some(elem => elem.is(":focus"))) return;

        if (e.keyCode == 32) { // spacebar
            increment();
        }
     });
})();