class Car {
    rego: string;
    colour: string;
    make: string;
    model: string;

    constructor(rego: string, colour: string, make: string, model: string) {
        this.rego = rego;
        this.colour = colour;
        this.make = make;
        this.model = model;
    }
}

export { Car }