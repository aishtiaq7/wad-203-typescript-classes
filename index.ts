enum Priority {
  Normal,
  Priority,
  Urgent,
}

abstract class Luggage {
  protected readonly fee: number = 5.2;
  constructor(
    protected weight: number,
    protected description: string,
    protected priority: Priority
  ) {}

  getWeight(): number {
    return this.weight;
  }

  setWeight(weight: number): void {
    this.weight = weight;
  }

  getDescription(): string {
    return this.description;
  }

  getPriority(): Priority {
    return this.priority;
  }

  abstract getPrice(): number;
  abstract toString(): string;
}

class FragileLuggage extends Luggage {
  constructor(
    weight: number,
    description: string,
    priority: Priority,
    private insurance: number
  ) {
    super(weight, description, priority);
  }

  getInsuranceValue(): number {
    return this.insurance;
  }

  setInsuranceValue(value: number): void {
    this.insurance = value;
  }

  getPrice(): number {
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

  toString(): string {
    return `Fragile Luggage: ${this.description}, Insurance: ${this.insurance}`;
  }
}

class RegularLuggage extends Luggage {
  getPrice(): number {
    if (this.weight <= 23) return 0;
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

  toString(): string {
    return `Regular Luggage: ${this.description}`;
  }
}

class CarryOnLuggage extends Luggage {
  getPrice(): number {
    if (this.weight <= 5) return 0;
    const extraWeight = this.weight - 5;
    return this.fee * 3 * extraWeight;
  }

  toString(): string {
    return `Carry-on Luggage: ${this.description}`;
  }
}

class ListOfLuggages {
  private luggages: Luggage[] = [];

  insertLuggage(luggage: Luggage): void {
    this.luggages.push(luggage);
  }

  printAllLuggages(): void {
    this.luggages.forEach((luggage) => console.log(luggage.toString()));
  }

  priceOfEachLuggage(): void {
    this.luggages.forEach((luggage) =>
      console.log(`${luggage.getDescription()} Price: ${luggage.getPrice()}`)
    );
  }

  totalPrice(): number {
    return this.luggages.reduce(
      (total, luggage) => total + luggage.getPrice(),
      0
    );
  }

  getFragileLuggageWithInsurance(): { count: number; totalInsurance: number } {
    const fragileLuggages = this.luggages.filter(
      (luggage) => luggage instanceof FragileLuggage
    ) as FragileLuggage[];
    const totalInsurance = fragileLuggages.reduce(
      (total, luggage) => total + luggage.getInsuranceValue(),
      0
    );
    return { count: fragileLuggages.length, totalInsurance };
  }

  sortByPrice(): void {
    this.luggages.sort((a, b) => a.getPrice() - b.getPrice());
  }

  sortByWeight(): void {
    this.luggages.sort((a, b) => a.getWeight() - b.getWeight());
  }
}

// Example Usage
const fragileLuggage = new FragileLuggage(
  10,
  "Box with fragile items",
  Priority.Normal,
  100
);
const regularLuggage = new RegularLuggage(
  30,
  "Luggage full of clothes",
  Priority.Priority
);
const carryOnLuggage = new CarryOnLuggage(
  6,
  "Luggage with personal items",
  Priority.Urgent
);

const list = new ListOfLuggages();
list.insertLuggage(fragileLuggage);
list.insertLuggage(regularLuggage);
list.insertLuggage(carryOnLuggage);

list.printAllLuggages();
list.priceOfEachLuggage();

console.log(`Total Price: ${list.totalPrice()}`);
console.log(list.getFragileLuggageWithInsurance());
