import { MetadataRoute } from "next"

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        {
            url: '',
            lastModified: new Date(),
        },
    ]
}

export default sitemap