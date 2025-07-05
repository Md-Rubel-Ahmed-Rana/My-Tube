import { EventEmitter2 } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";
import { UserActivityEventMap } from "src/constants/events";

export type GlobalEventMap = UserActivityEventMap;

@Injectable()
export class TypedEventEmitter {
  constructor(private readonly emitter: EventEmitter2) {}

  emit<K extends keyof GlobalEventMap>(event: K, payload: GlobalEventMap[K]) {
    this.emitter.emit(event, payload);
  }
}
