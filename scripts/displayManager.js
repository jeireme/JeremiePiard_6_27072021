const hello = "Hello world";
const bye = "Ciao hupapi muñaño";

function sayHello() {
    console.log(hello);
}

function sayGoodbye() {
    console.log(bye);
}

function sayNothing() {
    console.log("I have nothing to say");
}

export function saySomething(id) {
    if (id == 1) sayHello();
    else if (id == 2) sayGoodbye();
    else sayNothing();
}

export default saySomething;

// module.exports = {
//     thisIsAFunction
// }