export interface IState {
  [k: string]: any;
}

export interface IEvent {
  setInput(nextInput: string): void;
  setItemList(nextList: Array<string>): void;
  clearItemList(): void;
}

const INITIAL_STATE = {
  list: [],
  input: "",
};

const cloneDeep = (x: IState) => {
  return JSON.parse(JSON.stringify(x));
};

const freeze = (x: IState) => Object.freeze(cloneDeep(x));

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(initalState);
  let listeners: Array<Function> = [];

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
    clearItemList: () => {
      state.list = [];
      invokeListeners();
    },
    setItemList: (nextList: Array<string>) => {
      state.list = nextList;
      invokeListeners();
    },
    setInput: (nextInput: string) => {
      state.input = nextInput;
      invokeListeners();
    },
  };

  return {
    events,
    addChangeListener,
  };
};
