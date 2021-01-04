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
            dom: $('#user-input-monthly'),
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

        const years = parseInt(usageYearsDom.val(), 10);
        const totalCost = annualCosts * years + parseInt(inputs[0].dom.val(), 10);
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
            inputVals: [2799, 0, 0],
            usageYears: 4
        },
        {
            dom: $('#show-example-shoes'),
            inputVals: [140, 0, 0],
            usageYears: 2
        },
        {
            dom: $('#show-example-house'),
            inputVals: [800000, 0, 500],
            usageYears: 50
        },
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
