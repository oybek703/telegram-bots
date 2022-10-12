import axios, {AxiosError} from 'axios'
import {IPixAbayImageData} from './searchImages.interface'


async function searchImages(query: string): Promise<IPixAbayImageData> {
    try {
        const {data} = await axios.get<IPixAbayImageData>('https://pixabay.com/api/', {
            params: {
                key: process.env.PIXABAY_API_KEY,
                q: query
            }
        })
        return {
            total: data.total,
            totalHits: data.totalHits,
            hits: data.hits
        }
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            console.log('Error in while fetching from Pixabay: ', e.message)
        }
        return {
            total: 0,
            totalHits: 0,
            hits: []
        }
    }
}

export default searchImages
