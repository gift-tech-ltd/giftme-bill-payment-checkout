import Fuse from "fuse.js";

export function fuzzySearch(options: any) {
    const fuse = new Fuse(options, {
        keys: ["name", "groupName", "items.name"],
        threshold: 0.3,
    });

    return (value: any) => {
        if (!value.length) {
            return options;
        }

        return fuse.search(value).map(({ item }) => item);
    };
}
