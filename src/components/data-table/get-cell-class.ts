

export const getCellTextColor = (columnId: string) => {
    switch (columnId) {
        case 'id':
            return 'text-[#8A9099]'
        default:
            return 'text-base'
    }
}

export const getCellAlignment = (columnId: string) =>
    columnId === 'actions' ? 'text-end' : ''


