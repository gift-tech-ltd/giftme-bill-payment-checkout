import { useEffect, useState } from 'react';

// interface State {
//     selected: {
//         id: string | number | undefined;
//         data: any;
//     };
// }

// export function useItemSelect<T extends Array<{ id: string | number }>>(
//     list: T,
//     onItemSelect: (data: T[0]) => void,
//     defaultValue: string | number | undefined
// ) {
//     const [state, setState] = useState<State>({
//         selected: {
//             id: defaultValue,
//             data: undefined,
//         },
//     });

//     function onSelect(item: any) {
//         if (!item.disabled) {
//             setState({ selected: { id: item.id, data: item } });
//             onItemSelect(item);
//         }
//     }

//     function isSelected(item: T[0]) {
//         return state.selected.id === item.id;
//     }

//     useEffect(() => {
//         if (defaultValue) {
//             const item = list.find((l) => l.id === defaultValue);
//             if (item) {
//                 onSelect(item);
//             }
//         }
//     }, [defaultValue]);

//     return {
//         list,
//         state,
//         onSelect,
//         isSelected,
//     };
// }

interface State {
    selected: {
        [key: string]: any;
        // T: any;
        // id: string | number | undefined;
        data: any;
    };
}
export function useItemSelect<T extends Array<Record<string, any>>>(
    list: T,
    onItemSelect: (data: T[0]) => void,
    defaultValue: string | number | undefined,
    keyName: string = 'id'
) {
    const [state, setState] = useState<State>({
        selected: {
            [keyName]: defaultValue,
            data: undefined,
        },
    });

    function onSelect(item: any) {
        if (!item.disabled) {
            setState({ selected: { [keyName]: item[keyName], data: item } });
            onItemSelect(item);
        }
    }

    function isSelected(item: T[0]) {
        return state.selected[keyName] === item[keyName];
    }

    useEffect(() => {
        if (defaultValue) {
            const item = list.find((l) => l[keyName] === defaultValue);
            if (item) {
                onSelect(item);
            }
        }
    }, [defaultValue]);

    return {
        list,
        state,
        onSelect,
        isSelected,
    };
}
