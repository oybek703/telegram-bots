import axios from 'axios'
import {config} from 'dotenv'

config()

const BASE_URL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs'

async function translate(text: string, from: string, to: string) {
    const {data} = await axios.get(
        BASE_URL,
        {
            params: {
                key: process.env.YANDEX_API_KEY,
                text,
                lang: `${from} - ${to}`
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    console.log(data)
}

export default translate
