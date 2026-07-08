
export default function VideoRenderer({ embedUrl, title }: { embedUrl: string; title: string }) {
    return (
        <iframe
            style={{ display: "block", border: "none", width: "100%", height: "100%" }}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedUrl}?autoplay=1&controls=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
    )
}