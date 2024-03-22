

export default function Video() {

    return (
        <div className="max-w-sm mx-auto pt-6">
            <div className="aspect-w-35 aspect-h-30">
                <iframe
                    src="https://www.youtube.com/embed/1WIrC6ESWKg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}
