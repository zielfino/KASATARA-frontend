// src/lib/useClickOutside.ts
export function onClickOutside(callback: () => void, node: HTMLElement) {
  const handleClick = (e: MouseEvent) => {
    if (!node.contains(e.target as Node)) {
      callback();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
