import { IconChevronLeft, IconChevronRight, IconPhotoCancel } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export interface IAutoImageChangerProps {
    images: string[]
    durartionPerImage?: number
    aspectRatio?: 'aspect-square' | 'aspect-video' | 'aspect-auto'
    noAutoChange?: boolean
}

export const AutoImageChanger = ({
    images,
    durartionPerImage = 5000,
    aspectRatio = 'aspect-square',
    noAutoChange = false
}: IAutoImageChangerProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        if (noAutoChange) return

        const interval = setInterval(() => {
            setCurrentImageIndex((oldIndex) => (oldIndex + 1) % images.length)
        }, durartionPerImage)

        return () => clearInterval(interval)

        // Iteration Breakdown: 
        // Initial value (oldIndex = 0): ( 0 + 1 ) % 5 = 1 ---> The new currentImageIndex becomes 1. 
        // Second iteration (oldIndex = 1): ( 1 + 1 ) % 5 = 2 ---> The new currentImageIndex becomes 2.
        // Third iteration (oldIndex = 2): ( 2 + 1 ) % 5 = 3 ---> The new currentImageIndex becomes 3. 
        // Fourth iteration (oldIndex = 3): ( 3 + 1 ) % 5 = 4 ---> The new currentImageIndex becomes 4.
        //  Fifth iteration (oldIndex = 4): ( 4 + 1 ) % 5 = 0 ---> The new currentImageIndex loops back to 0.

    }, [durartionPerImage, images])

    if (images.length === 0) return (
        <div className="flex items-center justify-center w-full h-48 gap-2 text-sm bg-white border select-none border-gray-50 text-gray">
            <IconPhotoCancel /> No images.
        </div>
    )

    return (
        <div className={`relative w-full overflow-hidden ${aspectRatio}`}>
            <img src={images[currentImageIndex]} alt="Garage"
                className="object-cover h-full w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 space-x-2">
                {images.map((_, index) => (
                    <div className={`h-2 rounded-full ${currentImageIndex === index ? 'bg-white w-4' : 'bg-gray-300 w-2'}`}
                        key={index}
                    />
                ))}
            </div>
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className="absolute transform -translate-y-1/2 top-1/2 left-2"
                        onClick={() =>
                            setCurrentImageIndex((prevIndex) =>
                                prevIndex === 0 ? images.length - 1 : prevIndex - 1)
                        }
                    >
                        <IconChevronLeft
                            className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white"
                        />
                    </button>

                    <button
                        type="button"
                        className="absolute transform -translate-y-1/2 top-1/2 right-2"
                        onClick={() =>
                            setCurrentImageIndex(
                                (prevIndex) => (prevIndex + 1) % images.length
                            )
                        }
                    >
                        <IconChevronRight className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
                    </button>
                </>
            )}
        </div>
    )
}