import dayjs from 'dayjs';

export function formatDate0(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDate(
    date?: string | number | Date | dayjs.Dayjs | null | undefined,
    format: string = 'YYYY-MM-DD'
) {
    return dayjs(date).format(format);
}
