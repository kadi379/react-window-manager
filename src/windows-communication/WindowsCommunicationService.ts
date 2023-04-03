import { makeAutoObservable, observable, action } from "mobx";

export class WindowsCommunicationService {
  constructor() {
    makeAutoObservable(this);
  }
  
  @observable stores = observable.object<any>({}, { deep: true });
  
  @action createStore(storeId: string) {
    if (this.isStoreExists(storeId)) {
      console.error(this.storeAlreadyExitsErr(storeId));
      return;
    }
    this.stores[storeId] = {};
  }

  @action deleteStore(storeId: string) {
    if (!this.isStoreExists(storeId)) {
      console.error(this.storeDoesNotExistErr(storeId));
      return;
    }
    delete this.stores[storeId];
  }

  @action createState(storeId: string, stateName: string, initValue?: any) {
    if (!this.isStoreExists(storeId)) {
      console.error(this.storeDoesNotExistErr(storeId));
      return;
    }
    if (this.isStateExistsInStore(storeId, stateName)) {
      console.error(this.stateAlreadyExistsErr(storeId, stateName));
      return;
    }
    this.stores[storeId][stateName] = initValue;
  }

  @action getState(storeId: string, stateName: string) {
    if (!this.isStoreExists(storeId)) {
      console.error(this.storeDoesNotExistErr(storeId));
      return;
    }
    if (!this.isStateExistsInStore(storeId, stateName)) {
      console.error(this.stateDoesNotExistErr(storeId, stateName));
      return;
    }
    return this.stores[storeId][stateName];
  }

  @action setState(storeId: string, stateName: string, newValue: any) {
    if (!this.isStoreExists(storeId)) {
      console.error(this.storeDoesNotExistErr(storeId));
      return;
    }
    if (!this.isStateExistsInStore(storeId, stateName)) {
      console.error(this.stateDoesNotExistErr(storeId, stateName));
      return;
    }
    this.stores[storeId][stateName] = newValue;
  }

  @action deleteState(storeId: string, stateName: string) {
    if (!this.isStoreExists(storeId)) {
      console.error(this.storeDoesNotExistErr(storeId));
      return;
    }
    if (!this.isStateExistsInStore(storeId, stateName)) {
      console.error(this.stateDoesNotExistErr(storeId, stateName));
      return;
    }
    delete this.stores[storeId][stateName];
  }

  isStoreExists(storeId: string) {
    if (this.stores.hasOwnProperty(storeId)) return true;
    return false;
  }
  isStateExistsInStore(storeId: string, stateName: string) {
    if (!this.stores.hasOwnProperty(storeId)) return false;
    if (this.stores[storeId].hasOwnProperty(stateName)) return true;
    return false;
  }

  storeAlreadyExitsErr(storeId: string) {
    return `store "${storeId}" already exists.`;
  }
  storeDoesNotExistErr(storeId: string) {
    return `store "${storeId}" does not exist, use createStore to initialize it.`;
  }
  stateAlreadyExistsErr(storeId: string, stateName: string) {
    return `state "${stateName}" already exists on store "${storeId}".`;
  }
  stateDoesNotExistErr(storeId: string, stateName: string) {
    return `state "${stateName}" does not exist on store "${storeId}", use createState to initialize it.`;
  }
}

export const windowsCommunicationService = new WindowsCommunicationService();
