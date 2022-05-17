import { FieldProps } from 'formik';

export function hasFieldError(meta: FieldProps['meta']) {
    return !!meta.error && !!meta.touched;
}
