import 'mvp.css';

const unit_inputs: Object = {
    mps: {
        from: (value: number) => value,
        to: (value: number) => value,
    },
    knots: {
        from: (value: number) => value * 1850 / 3600,
        to: (value: number) => value * 3600 / 1850,
    },
    kmh: {
        from: (value: number) => value * 1000 / 3600,
        to: (value: number) => value * 3600 / 1000,
    },
    beaufort: {
        from: (value: number) => 0.836 * value ** (3/2),
        to: (value: number) => Math.round((value / 0.836) ** (2/3)),
    }
};

function update_units(event: Event) {
    const input = (<HTMLTextAreaElement>event.target);

    // @ts-ignore
    const mps = unit_inputs[input.id].from(input.value);

    for (const other_id in unit_inputs) {
        if(other_id !== input.id) {
            // @ts-ignore
            const other_element : HTMLInputElement = unit_inputs[other_id].element;
            // @ts-ignore
            const result = unit_inputs[other_id].to(mps);

            if(result - Math.floor(result) !== 0) {
                other_element.value = result.toFixed(2);
            } else {
                other_element.value = result;
            }

        }
    }
}

for (const id in unit_inputs) {
    const element = document.querySelector(`#${id}`);
    // @ts-ignore
    unit_inputs[id]["element"] = element;
    element.addEventListener('input', update_units);
}

