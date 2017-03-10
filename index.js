function processString(options) {
    function processInputWithRegex(option, input) {
        if (!option.fn || typeof option.fn !== 'function')
            return input;

        if (!option.regex || !(option.regex instanceof RegExp))
            return input;

        if (typeof input === 'string') {
            let regex = option.regex;
            let result = null;
            let output = [];

            while ((result = regex.exec(input)) !== null) {
                let index = result.index;
                let match = result[0];

                output.push(input.substring(0, index));
                output.push(option.fn(index, result));

                input = input.substring(index + match.length, input.length);
            }

            return output;
        } else if (Array.isArray(input)) {
            return input.map(chunk => processInputWithRegex(option, chunk));
        } else return input;
    }

    return function (input) {
        if (!options || !Array.isArray(options) || !options.length)
            return input;

        let result = options.map(option => processInputWithRegex(option, input));

        return result.filter(r => r.length).length ? result : input;
    };
}

module.exports = processString;