type ContextMenuEvent =
  | { type: 'show'; menuId: string; data: any; x: number; y: number }
  | { type: 'hide'; menuId: string };

const eventBus = new Map<string, ((event: ContextMenuEvent) => void)[]>();

export function onContextMenuEvent(
  menuId: string,
  callback: (event: ContextMenuEvent) => void
): void {
  if (!eventBus.has(menuId)) {
    eventBus.set(menuId, []);
  }
  eventBus.get(menuId)!.push(callback);
}

export function emitContextMenuEvent(event: ContextMenuEvent): void {
  const callbacks = eventBus.get(event.menuId);
  if (callbacks) {
    callbacks.forEach(callback => callback(event));
  }
}

export function offContextMenuEvent(
  menuId: string,
  callback: (event: ContextMenuEvent) => void
): void {
  const callbacks = eventBus.get(menuId);
  if (callbacks) {
    eventBus.set(
      menuId,
      callbacks.filter(cb => cb !== callback)
    );
  }
}
