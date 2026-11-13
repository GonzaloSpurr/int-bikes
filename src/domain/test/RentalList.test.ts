import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
    list.add(rental);
  });

  test("Create an empty rental list", () => {
    const emptyList = new RentalList();
    expect(emptyList.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    expect(list.getItems()).toEqual([rental]);
  });

  test("reject a bike that is already rented", () => {
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    expect(list.totalIncome()).toBe(300);
  });

  test("remove a bike", () => {
    list.remove("B-123");
    expect(list.getItems()).toStrictEqual([]);
  });

  test("can't remove a non-existant bike", () => {
    expect(() => list.remove("0xDEADBEEF")).toThrow();
  });

  test("late fees are calculated correctly", () => {
    rental.lateHours = 1;
    const newList = new RentalList();
    newList.add(rental);
    expect(newList.totalLateFees()).toBe(200);
  });
});
