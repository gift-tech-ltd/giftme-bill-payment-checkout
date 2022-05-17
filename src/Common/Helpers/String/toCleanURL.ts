export const toCleanURL = (str: string) => {
    if (!str) {
        return 'null';
    }
    // @ts-ignore
    return encodeURIComponent(
        str
            .toLowerCase()
            .replace(/(^-+|[^a-zA-Z0-9/_| -]+|-+$)/g, '')
            .toLowerCase()
            .trim()
            .replace(/[/_| -]+/g, '-')
    );
};
