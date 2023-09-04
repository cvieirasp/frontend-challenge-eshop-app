import { CagegoryTypes, PriorityTypes } from '@/types/filter-types'

export function getFilter(type: CagegoryTypes) {
    if (type == CagegoryTypes.BOOKS) return 'books'
    if (type == CagegoryTypes.GAMES) return 'games'
    return ''
}

export function getOrder(priority: PriorityTypes) {
    if (priority === PriorityTypes.NEWS) return { field: 'created_at', order: 'DSC' }
    if (priority === PriorityTypes.HIGHEST_PRICE) return { field: 'price_in_cents', order: 'DSC' }
    if (priority === PriorityTypes.LOWEST_PRICE) return { field: 'price_in_cents', order: 'ASC' }
    return { field: 'sales', order: 'DSC' }
}
