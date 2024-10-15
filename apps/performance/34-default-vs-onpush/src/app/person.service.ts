import { Injectable, signal, WritableSignal } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { Genre, Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly girlList = signal<Person[]>(
    randFirstName<Genre>({
      gender: 'female',
      length: 10,
    }).map((girl) => ({ name: girl, id: crypto.randomUUID() })),
  );

  Girls = this.girlList.asReadonly();

  private readonly boyList = signal<Person[]>(
    randFirstName<Genre>({ gender: 'male', length: 10 }).map((boy) => ({
      name: boy,
      id: crypto.randomUUID(),
    })),
  );

  Boys = this.boyList.asReadonly();

  addPerson(listName: string, newPersonName: string) {
    const list: WritableSignal<Person[]> = this.getListByName(listName);
    list.update((persons) => [
      { name: newPersonName, id: crypto.randomUUID() },
      ...persons,
    ]);
  }

  updateList(listName: string, newPerson: Person) {
    const list: WritableSignal<Person[]> = this.getListByName(listName);
    list.update((persons) =>
      persons.map((person) =>
        person.id === newPerson.id ? { ...newPerson } : person,
      ),
    );
  }

  deletePersonToList(listName: string, personID: string) {
    const list = this.getListByName(listName);
    list.update((persons) =>
      persons.filter((person) => person.id !== personID),
    );
  }

  private getListByName(listName: string): WritableSignal<Person[]> {
    return listName === 'Male' ? this.boyList : this.girlList;
  }
}
