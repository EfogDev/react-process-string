react-process-string
-----
The library allows you to process strings with regular expressions in ReactJS.

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
        let config = [{
            regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
                                 </span>
        }, {
            regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
                                 </span>
        }];

        let stringWithLinks = "Watch this on youtube.com";
        let processed = processString(config)(stringWithLinks);

        return (
            <div>Hello world! {processed}</div>
        );
    }
}
```
On the user side, `processed` will contain clickable links.

Example №2
---
```javascript
let users = ourStore.users;
let stringWithUsername = "Hello @efog, how do you feel today?";

let processed = processString([{
    regex: /\@([a-z0-9_\-]+?)( |\,|$|\.)/gim, //regex to match a username
    fn: (key, result) => {
        let username = result[1];
        let foundUsers = users.filter(user => user.username === username);

        if (!foundUsers.length)
            return result[0]; //@username

        return <a key={key} href={`/user/${username}`}>@{username}</a>;
    }
}]);
```
This code allows us to make `@usernames` clickable.
