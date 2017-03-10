react-process-string
-----
This library allows you to process strings with regular expressions in ReactJS.

Installation
---
Via npm:
```
npm install react-process-string --save
```

Syntax
---
```javascript
processString(options)(string);
```

Options should be an array of objects containing `regex` and `fn` fields.
`fn` is a function that takes two arguments: `key`, to pass it to a react component and `result` — the result of regex executing.

Example usage
---
```javascript
const processString = require('react-process-string');

class HelloWorld extends React.Component {
    render() {
        let stringWithLinks = "Watch this on youtube.com";
        let processed = processString([{
            regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span><a key={key} target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}</span>
        }, {
            regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span><a key={key} target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}</span>
        }])(string);

        return (
            <div>Hello world! {processed}</div>
        );
    }
}
```

On the user side, `processed` will contain clickable links.