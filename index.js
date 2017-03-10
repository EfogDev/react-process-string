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

            while ((result = regex.exec(string)) !== null) {
                let index = result.index;
                let match = result[0];

                output.push(string.substring(0, index));
                output.push(option.fn(index, result));

                string = string.substring(index + match.length, string.length);
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