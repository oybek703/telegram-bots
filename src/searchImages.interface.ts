export interface ISearchImages {
    id: string
    pageURL: string
    type: string
    tags: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    largeImageURL: string
    imageWidth: number
    imageHeight: number
    imageSize: number
    views: number
    downloads: number
    collections: number
    likes: number
    comments: number
    user_id: number
    user: string
    userImageURL: string
}


export interface IPixAbayImageData {
    total: number
    totalHits: number
    hits: ISearchImages[]
}
