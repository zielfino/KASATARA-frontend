// src/lib/theme.ts

export function getInitialDark(): boolean {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('isDark');
        if (saved !== null) {
            return saved === 'true';
        }
    }

    // fallback ke OS setting
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark;
}

export function applyDarkClass(isDark: boolean) {
    const html = document.documentElement;
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    localStorage.setItem('isDark', String(isDark));
}

export function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    applyDarkClass(!isDark);
}
