function ConstactStorage() {
    return {
        setConact(contact: any) {
            sessionStorage.setItem('contact', JSON.stringify(contact));
        },
        getContact(): null | { name: string; phone: string; email: string } {
            const contact = sessionStorage.getItem('contact');
            return contact ? JSON.parse(contact) : null;
        },
        removeContact() {
            sessionStorage.removeItem('contact');
        },
    };
}

export const constactStorage = ConstactStorage();
