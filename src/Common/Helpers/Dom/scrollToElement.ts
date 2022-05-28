export function getOffset(el: any) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

export const scrollToElement = (selector: string | HTMLElement, offset?: number) => {
    const element = typeof selector === "string" ? (document.querySelector(selector) as HTMLElement) : selector;
    if (element) {
        window.scrollTo({ top: getOffset(element).top + (offset || 0), behavior: "smooth" });
    }
};
