export function appendStyle(content: string, styleId: string = 'brand-colors') {
    const style = document.createElement('style');
    style.setAttribute('id', styleId);
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
}
