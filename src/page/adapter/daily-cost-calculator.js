(() => {
    const inputs = [
        {
            dom: $('#user-input-onetime'),
            factor: 0
        },
        {
            dom: $('#user-input-yearly'),
            factor: 1
        },
        {
            dom: $('#user-input-montly'),
            factor: 12
        }
    ]

    const usageYearsDom = $('#user-input-lifetime');

    const outputDivDom = $('#output-daily');

    // register update events
    inputs.forEach((input) => {
        input.dom.on('change keyup', update.bind(this))
    });

    function update() {
        let annualCosts = 0;

        inputs.forEach(({ dom, factor }) => {
            val = dom.val();
            annualCosts += val * factor;
        })

        const years = usageYearsDom.val();
        const totalCost = annualCosts * years + inputs[0].dom.val();
        const dailyCost = totalCost / years / 356;

        showVal(dailyCost);
    }

    function showVal(cost) {
        const costStr = cost.toFixed(2);
        let outputStr = "";
        if (!isNaN(costStr)) {
            outputStr = costStr + " $ / € / ...";
        }
        outputDivDom.html(outputStr);
    }

    // examples
    const examples = [
        {
            dom: $('#show-example-mac'),
            inputVals: [2799],
            usageYears: 4
        }
    ]

    examples.forEach(({dom, inputVals, usageYears}) => {
        dom.on('click', () => {
            inputVals.forEach((val, i) => {
                inputs[i].dom.val(val);
            })
            usageYearsDom.val(usageYears);
            update();
        })
    })

    update();
})();
