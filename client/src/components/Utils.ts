export type Direction = "ascending" | "descending"

export function sortByKey<T>(data: T[], key: keyof T, direction: Direction = "ascending"): T[] {
    if (!key)
        return [];

    const elementsToSort = [...data];
    elementsToSort.sort((firstElement, secondElement) => {
        if (secondElement[key] === null || firstElement[key] < secondElement[key]) return direction === 'ascending' ? -1 : 1;
        if (firstElement[key] === null || firstElement[key] > secondElement[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
    });
    return elementsToSort;
}