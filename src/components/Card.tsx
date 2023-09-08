import { FC } from "react"

interface ICardProp {
    image_url: string
    title: string
    description: string
    slug: string
    className?: any
}

const Card: FC<ICardProp>= (props) => {
    const { className, image_url, title, description, slug} = props
    return (
        <div className={`max-w-sm border rounded-lg shadow ${className}`}>
            <a href="#">
                <img className="rounded-t-lg" src={image_url ? image_url : 'https://picsum.photos/900/600'} alt={title || 'image'} />
            </a>
            <div className="p-5 bg-white">
                <h5 className="mb-2 text-2xl tracking-tight text-primary">{title || 'Lorem Ipsum'}</h5>
                <p className="mb-3text-white">{description || 'Description'}</p>
                <a className="inline-flex items-center px-3 py-2 text-sm text-white btn-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300" href={slug}>Read More</a>
            </div>
        </div>
    )
}

export default Card