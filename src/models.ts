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