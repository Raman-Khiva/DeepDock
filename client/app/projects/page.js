// import AnimatedFolder from "@/components/ThreeDFolder"

// export default function page() {
//     
//     return <AnimatedFolder title="DeepDock" projects={projects} />
// }

import { AppSidebar } from "@/components/app-sidebar"
import AnimatedFolder from "@/components/ThreeDFolder"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
    const projects = [
        { id: "networks", title: "Computer Networks", image: { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800" } },
        { id: "os", title: "Operating Systems", image: { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" } },
        { id: "dbms", title: "DBMS", image: { src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800" } },
    ]

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 sticky top-0 z-30 bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Build Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="w-full min-h-screen grid grid-cols-4 px-10 pt-10">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <AnimatedFolder key={i} title="Deepdock" projects={projects} />
                    ))}

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

