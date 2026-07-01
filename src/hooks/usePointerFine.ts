"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True when the primary input is a precise pointer (mouse/trackpad), not touch. */
export function usePointerFine(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
