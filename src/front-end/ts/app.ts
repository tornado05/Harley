class App{
    constructor() {
        console.log("constructor");
    }

    sayHello (): void {
        console.log("Hello");
    }

    getNumber (): number {
        return 5;
    }
}

let app = new App();

app.sayHello();

console.log(app.getNumber());

let a: number = 5;
let b: string = "hello";

let color = "blue";
color = "hi";

let testArray: number[] = [1, 2, 3];
let testArray1: Array<number> = [1, 2, 3];
let testArray2 = [1, 2, 3];
let testArray3 = [1, "2", 3];

let testArray4: Array<App> = [new App(), new App()];

a = 7;

enum Types {TEXT, SELECT, RADIO, APP}

let type: Types = Types.TEXT;

//console.log(app.constructor.name);

if (type === Types.TEXT) {
    console.log("This is text");
}

class Singleton {

    private controlString: string;

    private static instance:Singleton = null;

    public static getInstance(controlString: string):Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton(controlString);
        }
        return Singleton.instance;
    }

    private constructor(controlString: string) {
        this.controlString = controlString;
    }

    getValue(): string {
        return "Some string " + this.controlString;
    }
}

let instance1: Singleton = Singleton.getInstance("C1");
let instance2: Singleton = Singleton.getInstance("C2");

console.log("instance 1 - ", instance1.getValue());
console.log("instance 2 - ", instance2.getValue());

class Parent{
    private controlString: string = null;
    protected extendControlString: string = null;
    readonly someReadOnly :string = "readOnly";

    private prop: string = "default";

    constructor() {
        this.controlString = "Parent";
    }

    getValue() :string {
        return this.controlString;
    }

    getExtendValue() :string {
        return this.extendControlString;
    }

    get property() {
        return this.prop + "5";
    }

    set property(value: string) {
        this.prop = value;
    }
}

class Child extends Parent{
    updateValue (newValue: string):void {
        this.extendControlString = newValue;
    }

    getExtendValue() :string {
        return this.extendControlString + " child one";
    }

    getExtendOriginalValue() :string {
        return super.getExtendValue();
    }
}


let parentExtend = new Parent();
let childExtend = new Child();

console.log(parentExtend.getValue());
console.log(childExtend.getValue());
childExtend.updateValue("updatedExtendValue");
console.log(childExtend.getExtendValue());
console.log(childExtend.getExtendOriginalValue());
parentExtend.property = "new Value";
console.log(parentExtend.property);

abstract class VK3601 {
    constructor() {

    }

    abstract getDamage() :number;

    getDamagePerMinute(): number {
        return this.getDamage() * 5;
    }
}

class VK3601H extends VK3601{
    constructor(){
        super();
    }

    getDamage() {
        return 5;
    }
}

class VK3601L extends VK3601{
    constructor(){
        super();
    }

    getDamage() {
        return 0.8;
    }
}

let DrobTank = new VK3601L();
let KhmaraTank = new VK3601H();

if (DrobTank.getDamagePerMinute() > KhmaraTank.getDamagePerMinute()) {
    console.log("Drob wins");
} else {
    console.log("Drob loose");
}