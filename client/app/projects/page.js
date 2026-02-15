import AnimatedFolder from "@/components/ThreeDFolder"

export default function page() {
    const projects = [
        { id: "networks", title: "Computer Networks", image: { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800" } },
        { id: "os", title: "Operating Systems", image: { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" } },
        { id: "dbms", title: "DBMS", image: { src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800" } },
    ]

    return <AnimatedFolder title="DeepDock" projects={projects} />
}
