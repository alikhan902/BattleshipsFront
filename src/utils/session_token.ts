export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;  // Добавляем ; для корректного поиска
    const parts = value.split(`; ${name}=`);  // Разделяем на части по имени куки

    if (parts.length === 2) {
        const lastPart = parts.pop();  // Берем последнюю часть
        if (lastPart) {
            return lastPart.split(';')[0];  // Возвращаем значение до первого ; (если оно есть)
        }
    }
    return undefined;  // Если куки нет
}
