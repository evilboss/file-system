let myParams = {'foo': 'hi there', 'bar': '???'};

let u = new URLSearchParams(myParams).toString();

console.log(u);
