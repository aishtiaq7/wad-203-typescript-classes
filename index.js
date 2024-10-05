"use strict";
var Priority;
(function (Priority) {
    Priority[Priority["Normal"] = 0] = "Normal";
    Priority[Priority["Priority"] = 1] = "Priority";
    Priority[Priority["Urgent"] = 2] = "Urgent";
})(Priority || (Priority = {}));
class Luggage {
    weight;
    description;
    priority;
    fee = 5.2;
    constructor(weight, description, priority) {
        this.weight = weight;
        this.description = description;
        this.priority = priority;
    }
    getWeight() {
        return this.weight;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getDescription() {
        return this.description;
    }
    getPriority() {
        return this.priority;
    }
}
class FragileLuggage extends Luggage {
    insurance;
    constructor(weight, description, priority, insurance) {
        super(weight, description, priority);
        this.insurance = insurance;
    }
    getInsuranceValue() {
        return this.insurance;
    }
    setInsuranceValue(value) {
        this.insurance = value;
    }
    getPrice() {
        switch (this.priority) {
            case Priority.Normal:
                return this.insurance;
            case Priority.Priority:
                return this.fee * 5 + this.insurance;
            case Priority.Urgent:
                return this.fee * 10 + this.insurance;
            default:
                return 0;
        }
    }
    toString() {
        return `Fragile Luggage: ${this.description}, Insurance: ${this.insurance}`;
    }
}
class RegularLuggage extends Luggage {
    getPrice() {
        if (this.weight <= 23)
            return 0;
        const extraWeight = this.weight - 23;
        switch (this.priority) {
            case Priority.Normal:
                return this.fee * extraWeight;
            case Priority.Priority:
                return this.fee * 5 * extraWeight;
            case Priority.Urgent:
                return this.fee * 10 * extraWeight;
            default:
                return 0;
        }
    }
    toString() {
        return `Regular Luggage: ${this.description}`;
    }
}
class CarryOnLuggage extends Luggage {
    getPrice() {
        if (this.weight <= 5)
            return 0;
        const extraWeight = this.weight - 5;
        return this.fee * 3 * extraWeight;
    }
    toString() {
        return `Carry-on Luggage: ${this.description}`;
    }
}
class ListOfLuggages {
    luggages = [];
    insertLuggage(luggage) {
        this.luggages.push(luggage);
    }
    printAllLuggages() {
        this.luggages.forEach((luggage) => console.log(luggage.toString()));
    }
    priceOfEachLuggage() {
        this.luggages.forEach((luggage) => console.log(`${luggage.getDescription()} Price: ${luggage.getPrice()}`));
    }
    totalPrice() {
        return this.luggages.reduce((total, luggage) => total + luggage.getPrice(), 0);
    }
    getFragileLuggageWithInsurance() {
        const fragileLuggages = this.luggages.filter((luggage) => luggage instanceof FragileLuggage);
        const totalInsurance = fragileLuggages.reduce((total, luggage) => total + luggage.getInsuranceValue(), 0);
        return { count: fragileLuggages.length, totalInsurance };
    }
    sortByPrice() {
        this.luggages.sort((a, b) => a.getPrice() - b.getPrice());
    }
    sortByWeight() {
        this.luggages.sort((a, b) => a.getWeight() - b.getWeight());
    }
}
// Example Usage
const fragileLuggage = new FragileLuggage(10, "Box with fragile items", Priority.Normal, 100);
const regularLuggage = new RegularLuggage(30, "Luggage full of clothes", Priority.Priority);
const carryOnLuggage = new CarryOnLuggage(6, "Luggage with personal items", Priority.Urgent);
const list = new ListOfLuggages();
list.insertLuggage(fragileLuggage);
list.insertLuggage(regularLuggage);
list.insertLuggage(carryOnLuggage);
list.printAllLuggages();
list.priceOfEachLuggage();
console.log(`Total Price: ${list.totalPrice()}`);
console.log(list.getFragileLuggageWithInsurance());
