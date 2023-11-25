type Listener<T> = (event: T) => void;

class EventBus<E> {
  private listeners: { [key: string]: Array<Listener<E>> } = {};

  on(eventType: string, listener: Listener<E>): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  off(eventType: string, listener: Listener<E>): void {
    if (!this.listeners[eventType]) return;
    const index = this.listeners[eventType].indexOf(listener);
    if (index > -1) {
      this.listeners[eventType].splice(index, 1);
    }
  }

  emit(eventType: string, event: E): void {
    if (!this.listeners[eventType]) return;
    this.listeners[eventType].forEach((listener) => listener(event));
  }
}

export default EventBus;