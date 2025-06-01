export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart) {
            return lastPart.split(';').shift();
        }
    }
    return undefined;
}

