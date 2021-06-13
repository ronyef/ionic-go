export interface Entry {
    id: string
    date: string
    title: string
    pictureUrl: string
    description: string
}

export function toEntry(doc: any): Entry {
    return { id: doc.id, ...doc.data() }
}

export interface OrderModel {
    id: string
    dateTime: Date
    destination: string
    origin: string
    originCoords: {
        location: []
    }
    price: number
    status: string
    userId: string
}