class Person {
    constructor(name, lastName, age) {
        this.name= name;
        this.lastName= lastName;
        this.age= age;
    }

    static species = "Humano";

    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    getSpecies() {
        return `Aunque no lo creas soy un ${Person.species}`
    }
}

const person_1 = new Person("Jusce", "Cabrera", "21");
const person_2 = new Person("Kisho", "Cabrera", "10")

console.log(person_1.getFullName());
console.log(person_2.getFullName());

console.log(person_1.getSpecies());