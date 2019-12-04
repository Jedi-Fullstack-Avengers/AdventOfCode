'use strict'

// Part 1
// ======

const part1 = range => {
    const lowest = range[0];
    const highest = range[1];
    let counter = 0;

    for (let i = lowest; i <= highest; i++) {
        if (isValidPassword((i).toString(10).split(""))) {
            counter++;
        }
    }
    return counter;

    function isValidPassword(digits) {
        const hasDouble = (digits[0] === digits[1] || digits[1] === digits[2] || digits[2] === digits[3] || digits[3] === digits[4] || digits[4] === digits[5]);
        const noDecrease = (!(digits[0] > digits[1] || digits[1] > digits[2] || digits[2] > digits[3] || digits[3] > digits[4] || digits[4] > digits[5]));
        return hasDouble && noDecrease;
    }
};

// Part 2
// ======

const part2 = range => {
    const lowest = range[0];
    const highest = range[1];
    let counter = 0;

    for (let i = lowest; i <= highest; i++) {
        if (isValidPassword((i).toString(10).split(""))) {
            counter++;
        }
    }
    return counter;

    function isValidPassword(digits) {
        const hasDoubleNotTriple = (
            (digits[0] === digits[1] && digits[1] !== digits[2])
            || (digits[1] === digits[2] && digits[0] !== digits[1] && digits[2] !== digits[3])
            || (digits[2] === digits[3] && digits[1] !== digits[2] && digits[3] !== digits[4])
            || (digits[3] === digits[4] && digits[2] !== digits[3] && digits[4] !== digits[5])
            || (digits[4] === digits[5] && digits[3] !== digits[4]));
        const noDecrease = (!(digits[0] > digits[1] || digits[1] > digits[2] || digits[2] > digits[3] || digits[3] > digits[4] || digits[4] > digits[5]));
        return hasDoubleNotTriple && noDecrease;
    }
};

module.exports = {part1, part2};