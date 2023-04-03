import { makeAutoObservable, observable, action, computed } from "mobx";

export class WindowsCommunicationService {
  constructor() {
    makeAutoObservable(this);
  }
  
  @observable channels = observable.object<any>({}, { deep: true });
  
  @action createChannel(channelId: string) {
    if (this.isChannelExists(channelId)) {
      console.error(this.channelAlreadyExitsErr(channelId));
      return;
    }
    this.channels[channelId] = {};
  }

  @action deleteChannel(channelId: string) {
    if (!this.isChannelExists(channelId)) {
      console.error(this.channelDoesNotExistErr(channelId));
      return;
    }
    delete this.channels[channelId];
  }

  @action createState(channelId: string, stateName: string, initValue?: any) {
    if (!this.isChannelExists(channelId)) {
      console.error(this.channelDoesNotExistErr(channelId));
      return;
    }
    if (this.isStateExistsInChannel(channelId, stateName)) {
      console.error(this.stateAlreadyExistsErr(channelId, stateName));
      return;
    }
    this.channels[channelId][stateName] = initValue;
  }

  @action getState(channelId: string, stateName: string) {
    if (!this.isChannelExists(channelId)) {
      console.error(this.channelDoesNotExistErr(channelId));
      return;
    }
    if (!this.isStateExistsInChannel(channelId, stateName)) {
      console.error(this.stateDoesNotExistErr(channelId, stateName));
      return;
    }
    return this.channels[channelId][stateName];
  }

  @action setState(channelId: string, stateName: string, newValue: any) {
    if (!this.isChannelExists(channelId)) {
      console.error(this.channelDoesNotExistErr(channelId));
      return;
    }
    if (!this.isStateExistsInChannel(channelId, stateName)) {
      console.error(this.stateDoesNotExistErr(channelId, stateName));
      return;
    }
    this.channels[channelId][stateName] = newValue;
  }

  @action deleteState(channelId: string, stateName: string) {
    if (!this.isChannelExists(channelId)) {
      console.error(this.channelDoesNotExistErr(channelId));
      return;
    }
    if (!this.isStateExistsInChannel(channelId, stateName)) {
      console.error(this.stateDoesNotExistErr(channelId, stateName));
      return;
    }
    delete this.channels[channelId][stateName];
  }

  isChannelExists(channelId: string) {
    if (this.channels.hasOwnProperty(channelId)) return true;
    return false;
  }
  isStateExistsInChannel(channelId: string, stateName: string) {
    if (!this.channels.hasOwnProperty(channelId)) return false;
    if (this.channels[channelId].hasOwnProperty(stateName)) return true;
    return false;
  }

  channelAlreadyExitsErr(channelId: string) {
    return `channel "${channelId}" already exists.`;
  }
  channelDoesNotExistErr(channelId: string) {
    return `channel "${channelId}" does not exist, use createChannel to initialize it.`;
  }
  stateAlreadyExistsErr(channelId: string, stateName: string) {
    return `state "${stateName}" already exists on channel "${channelId}".`;
  }
  stateDoesNotExistErr(channelId: string, stateName: string) {
    return `state "${stateName}" does not exist on channel "${channelId}", use createState to initialize it.`;
  }
}

export const windowsCommunicationService = new WindowsCommunicationService();
