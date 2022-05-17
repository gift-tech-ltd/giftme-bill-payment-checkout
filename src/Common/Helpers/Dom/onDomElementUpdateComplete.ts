export function onDomElementUpdateComplete($tartget: string | HTMLElement | Node, callback: () => void) {
    let activeCount = 1;
    const $element = typeof $tartget === 'string' ? (document.querySelector($tartget) as HTMLElement) : $tartget;

    const observer = new MutationObserver(function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if (activeCount === 1) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
                activeCount++;
            }
        }
    });

    observer.observe($element, {
        childList: true,
        subtree: true,
    });
}
