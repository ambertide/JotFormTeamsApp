import I from "immutable";
import updateCollection from "utils/updateCollection";

type AnimalSound = {
  animal: string;
  sound: string;
};

describe("Update Collections Function", () => {
  it("should update a collection correctly, preserving indexes as much as possible.", () => {
    const oldCollection = I.List<AnimalSound>([
      { animal: "cat", sound: "meow" },
      { animal: "dog", sound: "quack" },
    ]);
    const newCollection = I.List<AnimalSound>([
      { animal: "dog", sound: "woof" },
      { animal: "duck", sound: "quack" },
    ]);
    const keyResolver = (animal: AnimalSound) => animal.animal;
    const updatedCollection = updateCollection(oldCollection, newCollection, keyResolver);
    const expectedCollection = I.List<AnimalSound>([
      { animal: "cat", sound: "meow" },
      { animal: "dog", sound: "woof" },
      { animal: "duck", sound: "quack" },
    ]);
    console.log(updatedCollection.toArray());
    expect(updatedCollection).toEqual<I.List<AnimalSound>>(expectedCollection);
  });
});
