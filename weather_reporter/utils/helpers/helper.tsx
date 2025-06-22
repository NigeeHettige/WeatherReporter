import React from "react";

const CACHE_KEY_PREFIX = "placePredictionCache_";
const CACHE_EXPIRATION_MS = 10 * 60 * 1000;

export function setCache(query: string, data: string[]) {
  const item = {
    timeStamp: Date.now(),
    data,
  };
  localStorage.setItem(CACHE_KEY_PREFIX + query, JSON.stringify(item));
}

export function getCache(query: string): string[] | null {
  const itemStr = localStorage.getItem(CACHE_KEY_PREFIX + query);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    if (Date.now() - item.timestamp < CACHE_EXPIRATION_MS) {
      return item.data;
    } else {
      localStorage.removeItem(CACHE_KEY_PREFIX + query);
      return null;
    }
  } catch {
    localStorage.removeItem(CACHE_KEY_PREFIX + query);
    return null;
  }
}
