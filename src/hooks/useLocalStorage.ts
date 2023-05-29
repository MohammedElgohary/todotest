import React from "react";

export default function useLocalStorage(name: string, initialValue: any) {
  return JSON.parse(localStorage.getItem(name) || String(initialValue));
}
