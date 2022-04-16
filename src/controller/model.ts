import { autoDataSet } from "../core/fetchItems";

export interface IState {
  [k: string]: any;
}

export interface IEvent {
  arrowHandler(arrow: string): void;
  clearItemList(): void;
  enterItem(): void;
  setInput(nextInput: string): void;
  setDisplayBlock(): Function;
  setDisplayNone(): Function;
  setItemList(nextList: Promise<Array<autoDataSet>>): void;
}

const INITIAL_STATE = {
  input: "",
  list: [],
  pos: -1,
};

const cloneDeep = (x: IState) => {
  return JSON.parse(JSON.stringify(x));
};

const freeze = (x: IState) => Object.freeze(cloneDeep(x));

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(initalState);
  let listeners: Array<Function> = [];

  const setPos = (nextpos: number) => {
    state.pos = nextpos;
    console.log("current pos", state.pos);
  };

  const addChangeListener = (listener: Function) => {
    console.log("addChangeListener - ", listener);

    listeners.push(listener);
    listener(freeze(state));

    return () => {
      listeners = listeners.filter((l: Function) => l !== listener);
    };
  };

  const invokeListeners = () => {
    const data = freeze(state);
    listeners.forEach((l) => l(data));

    console.log("invokeListeners state - ", data);
  };

  const events: IEvent = {
    arrowHandler: (arrow: string) => {
      let pos: number = state.pos;
      const loop = state.list.length;
      //remove active
      const active = document.getElementsByClassName("item-active");
      active?.item(0)?.setAttribute("class", "item");

      if (!loop) {
        return;
      }

      if (arrow == "ArrowDown") {
        const nextPos = ++pos % loop;
        if (!nextPos) {
          pos = 0;
        }
      }

      if (arrow == "ArrowUp") {
        if (--pos <= -1) {
          pos = loop - 1;
        }
      }

      //set Selected Item.
      const items = document.getElementsByClassName("item");
      items.item(pos)?.setAttribute("class", "item-active");

      setPos(pos);
    },
    clearItemList: () => {
      state.list = [];
      invokeListeners();
    },
    enterItem: () => {
      const active = <HTMLElement>(
        document.getElementsByClassName("item-active")?.item(0)
      );

      if (active?.dataset.value) {
        state.input = active?.dataset.value;
        events.clearItemList();
      }
    },
    setDisplayBlock: () => {
      return (targetElement: HTMLElement) =>
        targetElement.setAttribute("style", "display : block");
    },
    setDisplayNone: () => {
      return (targetElement: HTMLElement) =>
        targetElement.setAttribute("style", "display : none");
    },
    setItemList: async (nextDataSet: Promise<Array<autoDataSet>>) => {
      const list = await nextDataSet;
      state.list = list.map((e: autoDataSet) => {
        return e.text;
      });

      console.log(state.list);
      setPos(-1);
      invokeListeners();
    },
    setInput: (nextInput: string) => {
      state.input = nextInput;
      if (!nextInput) {
        return events.clearItemList();
      }

      invokeListeners();
    },
  };

  return {
    events,
    addChangeListener,
  };
};
