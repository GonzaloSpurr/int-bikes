import type { BikeType, Rental } from "./Rental.ts";
export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(_bikeCode: string): void {
    const bikes: Rental[] = [];
    this.#items.forEach((bike) => {
      if (bike.bikeCode !== _bikeCode) {
        bikes.push(bike);
      }
    });
    if (bikes.length === this.#items.length) {
      throw new Error(
        `No se encuentra bicicleta ${_bikeCode} en la base de datos`,
      );
    }
    this.#items = bikes;
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
    let total: number = 0;
    this.getItems().forEach((bike) => {
      total += bike.lateHours * bike.pricePerHour * 2;
    });
    return total;
  }
}
