import { action, computed, makeObservable, observable, observe, reaction, runInAction } from "mobx";

export class Door {
  @observable position;
  @observable time;

  constructor (id, position, state) {
    makeObservable(this);
    this.id = id;
    this.position = position;
    this.state = state;
    this.interval = null;
    this.time = 0;
  }

  @action toggle = () => {
    switch (this.state) {
      case 'Closed':
        this.state = 'Opening';
        this.open();
        break;
      case 'Opening':
        this.state = 'Opening stoped';
        this.stop();
        break;
      case 'Open':
        this.state = 'Closing';
        this.close();
        break;
      case 'Closing':
        this.state = 'Closing stoped';
        this.stop();
        break;
      case 'Opening stoped':
        this.state = 'Closing';
        this.close();
        break;
      case 'Closing stoped':
        this.state = 'Opening';
        this.open();
        break;
      default:
        break;
    }
  };

  open = () => {
    this.time = 0;
    this.interval = setInterval(() => {
      if (this.position === -300) {
        this.stop();
      } else {
        runInAction(() => {
          this.position -= 10
          this.time += 0.1;
        });
      }
    }, 100)
  }

  close = () => {
    this.time = 0;
    this.interval = setInterval(() => {
      if (this.position === 0) {
        this.stop();
      } else {
        runInAction(() => {
          this.position += 10
          this.time += 0.1;
        });
      }
    }, 100)
  }

  stop = () => {
    clearInterval(this.interval);
  }
}

export class Button {
  @observable color;
  @observable text;

  constructor (id, color, text) {
    makeObservable(this);
    this.id = id;
    this.color = color;
    this.text = text;
  }

  @action toggle = () => {
    switch (this.text) {
      case 'Open':
        this.text = 'Stop';
        this.color = 'red';
        break;
      case 'Close':
        this.text = 'Stop';
        this.color = 'green';
        break;
      case 'Stop':
        if (this.color === 'red') {
          this.text = 'Close';
          this.color = 'green';
        } else {
          this.text = 'Open';
          this.color = 'red';
        }
        break;
      default:
        break;
    }
  };
}

export class GarageStore {
  @observable doors = [
    new Door(0, 0, 'Closed'),
    new Door(1, 0, 'Closed'),
  ];
  @observable buttons = [
    new Button(0, 'red', 'Open'),
    new Button(1, 'red', 'Open'),
  ];

  constructor() {
    makeObservable(this);
    this.buttons.forEach(button => reaction(
      () => button.text,
      () => this.doors[button.id].toggle(),
    ));
    this.doors.forEach(door => reaction(
      () => door.position,
      () => {
        if (door.position === 0 || door.position === -300) {
          this.buttons[door.id].toggle();
        }
      }
    ));
  }

  @computed get allDoors () {
    return this.doors;
  }

  @computed get allButtons () {
    return this.buttons;
  }
}