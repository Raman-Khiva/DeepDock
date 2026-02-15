'use client'
import {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    useCallback,
    forwardRef,
} from "react"

// A nice gradient placeholder for fallback/default usage
const PLACEHOLDER_IMG_URL =
    "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800"

export default function AnimatedFolder({
    title = "Branding",
    projects = [
        {
            id: "1",
            image: {
                src: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=800",
            },
            title: "Lumnia",
            link: "https://example.com/lumnia",
        },
        {
            id: "2",
            image: {
                src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
            },
            title: "Prism",
            link: "https://example.com/prism",
        },
        {
            id: "3",
            image: {
                src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
            },
            title: "Vertex",
            link: "https://example.com/vertex",
        },
    ],
    folderBackColor = "#fb923c",
    folderFrontColor = "#fbbf24",
    folderTabColor = "#ea580c",
    mainCardBackgroundColor = "#ffffff",
    mainCardBorderColor = "#e5e7eb",
    mainCardBorderWidth = 1,
    mainCardHoverBorderColor = "#fb923c",
    mainCardHoverBorderWidth = 2,
    projectCardBackgroundColor = "#ffffff",
    projectCardBorderColor = "#e5e7eb",
    projectCardBorderWidth = 1,
    projectCardHoverBorderColor = "#fb923c",
    projectCardHoverBorderWidth = 2,
    titleFont = {
        fontSize: "18px",
        fontWeight: 600,
        letterSpacing: "0px",
    },
    titleColor = "#111827",
    projectCountFont = {
        fontSize: "14px",
        fontWeight: 400,
        letterSpacing: "0px",
    },
    cardTitleFont = {
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0px",
    },
    projectCountColor = "#6b7280",
    hoverExploreColor = "#6b7280",
}) {
    const [mainHovered, setMainHovered] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [sourceRect, setSourceRect] = useState(null)
    const [hiddenCardId, setHiddenCardId] = useState(null)
    const cardRefs = useRef([])

    const handleProjectClick = (project, index) => {
        const cardEl = cardRefs.current[index]
        if (cardEl) {
            setSourceRect(cardEl.getBoundingClientRect())
        }
        setSelectedIndex(index)
        setHiddenCardId(project.id)
    }

    const handleCloseLightbox = () => {
        setSelectedIndex(null)
        setSourceRect(null)
    }

    const handleCloseComplete = () => {
        setHiddenCardId(null)
    }

    const handleNavigate = (newIndex) => {
        setSelectedIndex(newIndex)
        setHiddenCardId(projects[newIndex]?.id || null)
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    backgroundColor: mainCardBackgroundColor,
                    border: `${mainHovered ? mainCardHoverBorderWidth : mainCardBorderWidth}px solid ${mainHovered ? mainCardHoverBorderColor : mainCardBorderColor}`,
                    transition: "all 500ms ease-out",
                    minWidth: "280px",
                    minHeight: "320px",
                    perspective: "1000px",
                    boxShadow: mainHovered
                        ? "0 25px 50px -12px rgba(251, 146, 60, 0.1)"
                        : "none",
                }}
                onMouseEnter={() => setMainHovered(true)}
                onMouseLeave={() => setMainHovered(false)}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "16px",
                        background:
                            "radial-gradient(circle at 50% 70%, rgba(251, 146, 60, 0.08) 0%, transparent 70%)",
                        opacity: mainHovered ? 1 : 0,
                        transition: "opacity 500ms",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                        height: "160px",
                        width: "200px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "128px",
                            height: "96px",
                            backgroundColor: folderBackColor,
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            transformOrigin: "bottom center",
                            transform: mainHovered
                                ? "rotateX(-15deg)"
                                : "rotateX(0deg)",
                            transition:
                                "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 10,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            width: "48px",
                            height: "16px",
                            backgroundColor: folderTabColor,
                            borderTopLeftRadius: "6px",
                            borderTopRightRadius: "6px",
                            top: "calc(50% - 48px - 12px)",
                            left: "calc(50% - 64px + 16px)",
                            transformOrigin: "bottom center",
                            transform: mainHovered
                                ? "rotateX(-25deg) translateY(-2px)"
                                : "rotateX(0deg)",
                            transition:
                                "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 10,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 20,
                        }}
                    >
                        {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el
                                }}
                                image={project.image}
                                title={project.title}
                                delay={index * 80}
                                isVisible={mainHovered}
                                index={index}
                                onClick={() =>
                                    handleProjectClick(project, index)
                                }
                                isSelected={hiddenCardId === project.id}
                                cardBackgroundColor={projectCardBackgroundColor}
                                cardBorderColor={projectCardBorderColor}
                                cardBorderWidth={projectCardBorderWidth}
                                cardHoverBorderColor={
                                    projectCardHoverBorderColor
                                }
                                cardHoverBorderWidth={
                                    projectCardHoverBorderWidth
                                }
                                cardTitleFont={cardTitleFont}
                            />
                        ))}
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            width: "128px",
                            height: "96px",
                            backgroundColor: folderFrontColor,
                            borderRadius: "8px",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            top: "calc(50% - 48px + 4px)",
                            transformOrigin: "bottom center",
                            transform: mainHovered
                                ? "rotateX(25deg) translateY(8px)"
                                : "rotateX(0deg)",
                            transition:
                                "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 30,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            width: "128px",
                            height: "96px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            pointerEvents: "none",
                            top: "calc(50% - 48px + 4px)",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
                            transformOrigin: "bottom center",
                            transform: mainHovered
                                ? "rotateX(25deg) translateY(8px)"
                                : "rotateX(0deg)",
                            transition:
                                "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            zIndex: 31,
                        }}
                    />
                </div>

                <h3
                    style={{
                        ...titleFont,
                        color: titleColor,
                        marginTop: "16px",
                        transition: "all 300ms",
                        transform: mainHovered
                            ? "translateY(4px)"
                            : "translateY(0)",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        ...projectCountFont,
                        color: projectCountColor,
                        transition: "all 300ms",
                        opacity: mainHovered ? 0.7 : 1,
                    }}
                >
                    {projects.length} projects
                </p>

                <div
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "50%",
                        transform: mainHovered
                            ? "translate(-50%, 10px)"
                            : "translate(-50%, 0)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: hoverExploreColor,
                        transition: "all 300ms",
                        opacity: mainHovered ? 0 : 0.6,
                    }}
                >
                    <span>Hover to explore</span>
                </div>
            </div>

            <ImageLightbox
                projects={projects}
                currentIndex={selectedIndex ?? 0}
                isOpen={selectedIndex !== null}
                onClose={handleCloseLightbox}
                sourceRect={sourceRect}
                onCloseComplete={handleCloseComplete}
                onNavigate={handleNavigate}
                cardTitleFont={cardTitleFont}
            />
        </div>
    )
}

const ProjectCard = forwardRef(
    (
        {
            image,
            title,
            delay,
            isVisible,
            index,
            onClick,
            isSelected,
            cardBackgroundColor,
            cardBorderColor,
            cardBorderWidth,
            cardHoverBorderColor,
            cardHoverBorderWidth,
            cardTitleFont,
        },
        ref
    ) => {
        const rotations = [-12, 0, 12]
        const translations = [-55, 0, 55]
        const [cardHover, setCardHover] = useState(false)

        return (
            <div
                ref={ref}
                style={{
                    position: "absolute",
                    width: "80px",
                    height: "112px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: cardBackgroundColor,
                    border: `${cardHover ? cardHoverBorderWidth : cardBorderWidth}px solid ${cardHover ? cardHoverBorderColor : cardBorderColor}`,
                    cursor: "pointer",
                    transform: isVisible
                        ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
                        : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
                    opacity: isSelected ? 0 : isVisible ? 1 : 0,
                    transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                    zIndex: 10 - index,
                    left: "-40px",
                    top: "-56px",
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }}
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
            >
                <img
                    src={image?.src || PLACEHOLDER_IMG_URL}
                    srcSet={image?.srcSet}
                    alt={image?.alt || title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                />
                <p
                    style={{
                        position: "absolute",
                        bottom: "6px",
                        left: "6px",
                        right: "6px",
                        ...cardTitleFont,
                        color: "#ffffff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {title}
                </p>
            </div>
        )
    }
)

function ImageLightbox({
    projects,
    currentIndex,
    isOpen,
    onClose,
    sourceRect,
    onCloseComplete,
    onNavigate,
    cardTitleFont,
}) {
    const [animationPhase, setAnimationPhase] = useState("initial")
    const [isClosing, setIsClosing] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const [internalIndex, setInternalIndex] = useState(currentIndex)
    const [isSliding, setIsSliding] = useState(false)

    const totalProjects = projects.length
    const hasNext = internalIndex < totalProjects - 1
    const hasPrev = internalIndex > 0
    const currentProject = projects[internalIndex]

    useEffect(() => {
        if (isOpen && currentIndex !== internalIndex && !isSliding) {
            setIsSliding(true)
            const timer = setTimeout(() => {
                setInternalIndex(currentIndex)
                setIsSliding(false)
            }, 400)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, isOpen, internalIndex, isSliding])

    useEffect(() => {
        if (isOpen) {
            setInternalIndex(currentIndex)
            setIsSliding(false)
        }
    }, [isOpen, currentIndex])

    const navigateNext = useCallback(() => {
        if (internalIndex >= totalProjects - 1 || isSliding) return
        onNavigate(internalIndex + 1)
    }, [internalIndex, totalProjects, isSliding, onNavigate])

    const navigatePrev = useCallback(() => {
        if (internalIndex <= 0 || isSliding) return
        onNavigate(internalIndex - 1)
    }, [internalIndex, isSliding, onNavigate])

    const handleClose = useCallback(() => {
        setIsClosing(true)
        onClose()
        setTimeout(() => {
            setIsClosing(false)
            setShouldRender(false)
            setAnimationPhase("initial")
            onCloseComplete?.()
        }, 400)
    }, [onClose, onCloseComplete])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return
            if (e.key === "Escape") handleClose()
            if (e.key === "ArrowRight") navigateNext()
            if (e.key === "ArrowLeft") navigatePrev()
        }

        window.addEventListener("keydown", handleKeyDown)
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [isOpen, handleClose, navigateNext, navigatePrev])

    useLayoutEffect(() => {
        if (isOpen && sourceRect) {
            setShouldRender(true)
            setAnimationPhase("initial")
            setIsClosing(false)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimationPhase("animating")
                })
            })
            const timer = setTimeout(() => {
                setAnimationPhase("complete")
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isOpen, sourceRect])

    const handleDotClick = (idx) => {
        if (isSliding || idx === internalIndex) return
        onNavigate(idx)
    }

    if (!shouldRender || !currentProject) return null

    const getInitialStyles = () => {
        if (!sourceRect) return {}

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const targetWidth = Math.min(768, viewportWidth - 64)
        const targetHeight = Math.min(viewportHeight * 0.85, 600)

        const targetX = (viewportWidth - targetWidth) / 2
        const targetY = (viewportHeight - targetHeight) / 2

        const scaleX = sourceRect.width / targetWidth
        const scaleY = sourceRect.height / targetHeight
        const scale = Math.max(scaleX, scaleY)

        const translateX =
            sourceRect.left + sourceRect.width / 2 - (targetX + targetWidth / 2)
        const translateY =
            sourceRect.top +
            sourceRect.height / 2 -
            (targetY + targetHeight / 2)

        return {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            opacity: 1,
        }
    }

    const getFinalStyles = () => {
        return {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
        }
    }

    const currentStyles =
        animationPhase === "initial" && !isClosing
            ? getInitialStyles()
            : getFinalStyles()

    return (
        <div
            onClick={handleClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                opacity: isClosing ? 0 : 1,
                transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(20px)",
                    opacity: animationPhase === "initial" && !isClosing ? 0 : 1,
                    transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            />

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                }}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 50,
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    cursor: "pointer",
                    padding: 0,
                    opacity:
                        animationPhase === "complete" && !isClosing ? 1 : 0,
                    transform:
                        animationPhase === "complete" && !isClosing
                            ? "translateY(0)"
                            : "translateY(-10px)",
                    transition:
                        "opacity 300ms ease-out, transform 300ms ease-out, background-color 200ms",
                }}
                onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    navigatePrev()
                }}
                disabled={!hasPrev || isSliding}
                style={{
                    position: "absolute",
                    left: "32px",
                    zIndex: 50,
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    cursor: hasPrev ? "pointer" : "default",
                    fontSize: "28px",
                    opacity:
                        animationPhase === "complete" && !isClosing && hasPrev
                            ? 1
                            : 0,
                    transform:
                        animationPhase === "complete" && !isClosing
                            ? "translateX(0)"
                            : "translateX(-20px)",
                    transition:
                        "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms, background-color 200ms",
                    pointerEvents: !hasPrev || isSliding ? "none" : "auto",
                }}
                onMouseEnter={(e) =>
                    hasPrev &&
                    (e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
            >
                ‹
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    navigateNext()
                }}
                disabled={!hasNext || isSliding}
                style={{
                    position: "absolute",
                    right: "32px",
                    zIndex: 50,
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    cursor: hasNext ? "pointer" : "default",
                    fontSize: "28px",
                    opacity:
                        animationPhase === "complete" && !isClosing && hasNext
                            ? 1
                            : 0,
                    transform:
                        animationPhase === "complete" && !isClosing
                            ? "translateX(0)"
                            : "translateX(20px)",
                    transition:
                        "opacity 300ms ease-out 150ms, transform 300ms ease-out 150ms, background-color 200ms",
                    pointerEvents: !hasNext || isSliding ? "none" : "auto",
                }}
                onMouseEnter={(e) =>
                    hasNext &&
                    (e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.2)")
                }
                onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                }
            >
                ›
            </button>

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    ...currentStyles,
                    transform: isClosing
                        ? "translate(0, 0) scale(0.95)"
                        : currentStyles.transform,
                    transition:
                        animationPhase === "initial" && !isClosing
                            ? "none"
                            : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out",
                    transformOrigin: "center center",
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    maxWidth: "768px",
                }}
            >
                <div
                    style={{
                        borderRadius:
                            animationPhase === "initial" && !isClosing
                                ? "8px"
                                : "16px",
                        transition:
                            "border-radius 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                        <div
                            style={{
                                display: "flex",
                                transform: `translateX(-${internalIndex * 100}%)`,
                                transition: isSliding
                                    ? "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)"
                                    : "none",
                            }}
                        >
                            {projects.map((project) => (
                                <img
                                    key={project.id}
                                    src={
                                        project.image?.src ||
                                        PLACEHOLDER_IMG_URL
                                    }
                                    srcSet={project.image?.srcSet}
                                    alt={project.image?.alt || project.title}
                                    style={{
                                        minWidth: "100%",
                                        width: "100%",
                                        height: "100%", // UPDATED: Fill height to match the tallest sibling
                                        maxHeight: "70vh",
                                        objectFit: "cover", // UPDATED: Ensures image covers the area without black bars
                                        flexShrink: 0,
                                        display: "block",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            opacity:
                                animationPhase === "complete" && !isClosing
                                    ? 1
                                    : 0,
                            transform:
                                animationPhase === "complete" && !isClosing
                                    ? "translateY(0)"
                                    : "translateY(20px)",
                            transition:
                                "opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms",
                            padding: "24px",
                            backgroundColor: "#ffffff",
                            borderTop: "1px solid #e5e7eb",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "space-between",
                                gap: "16px",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h3
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        ...cardTitleFont,
                                        color: "#111827",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {currentProject?.title}
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginTop: "4px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                    >
                                        <kbd
                                            style={{
                                                padding: "3px 8px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                backgroundColor: "#f3f4f6",
                                                color: "#6b7280",
                                                borderRadius: "4px",
                                                border: "1px solid #e5e7eb",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            ←
                                        </kbd>
                                        <kbd
                                            style={{
                                                padding: "3px 8px",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                                backgroundColor: "#f3f4f6",
                                                color: "#6b7280",
                                                borderRadius: "4px",
                                                border: "1px solid #e5e7eb",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            →
                                        </kbd>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "#6b7280",
                                                marginLeft: "4px",
                                            }}
                                        >
                                            to navigate
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginLeft: "4px",
                                        }}
                                    >
                                        {projects.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    handleDotClick(idx)
                                                }
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    borderRadius: "50%",
                                                    backgroundColor:
                                                        idx === internalIndex
                                                            ? "#111827"
                                                            : "rgba(107, 114, 128, 0.4)",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: 0,
                                                    transform:
                                                        idx === internalIndex
                                                            ? "scale(1.2)"
                                                            : "scale(1)",
                                                    transition: "all 300ms",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (currentProject?.link) {
                                        window.open(
                                            currentProject.link,
                                            "_blank"
                                        )
                                    }
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#6b7280",
                                    backgroundColor: "rgba(243, 244, 246, 0.5)",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    cursor: currentProject?.link
                                        ? "pointer"
                                        : "default",
                                    transition: "all 200ms ease-out",
                                    whiteSpace: "nowrap",
                                    opacity: currentProject?.link ? 1 : 0.5,
                                }}
                                onMouseEnter={(e) => {
                                    if (currentProject?.link) {
                                        e.currentTarget.style.backgroundColor =
                                            "#f3f4f6"
                                        e.currentTarget.style.color = "#111827"
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(243, 244, 246, 0.5)"
                                    e.currentTarget.style.color = "#6b7280"
                                }}
                            >
                                <span>View</span>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// addPropertyControls(AnimatedFolder, {

//     projects: {
//         type: ControlType.Array,
//         title: "Projects",
//         control: {
//             type: ControlType.Object,
//             controls: {
//                 id: {
//                     type: ControlType.String,
//                     title: "ID",
//                     defaultValue: "",
//                 },
//                 image: {
//                     type: ControlType.ResponsiveImage,
//                     title: "Image",
//                     defaultValue: { src: PLACEHOLDER_IMG_URL },
//                 },
//                 title: {
//                     type: ControlType.String,
//                     title: "Title",
//                     defaultValue: "Project",
//                 },
//                 link: {
//                     type: ControlType.String,
//                     title: "Link",
//                     defaultValue: "https://example.com",
//                     placeholder: "https://example.com",
//                 },
//             },
//         },
//         defaultValue: [
//             {
//                 id: "1",
//                 image: {
//                     src: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=800",
//                 },
//                 title: "Lumnia",
//                 link: "https://example.com/lumnia",
//             },
//             {
//                 id: "2",
//                 image: {
//                     src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
//                 },
//                 title: "Prism",
//                 link: "https://example.com/prism",
//             },
//             {
//                 id: "3",
//                 image: {
//                     src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
//                 },
//                 title: "Vertex",
//                 link: "https://example.com/vertex",
//             },
//         ],
//     },
//     title: {
//         type: ControlType.String,
//         title: "Title",
//         defaultValue: "Branding",
//     },
//     titleFont: {
//         type: ControlType.Font,
//         title: "Title Font",
//         defaultValue: {
//             fontSize: "18px",
//             fontWeight: 600,
//             letterSpacing: "0px",
//         },
//         controls: "extended",
//     },
//     titleColor: {
//         type: ControlType.Color,
//         title: "Title Color",
//         defaultValue: "#111827",
//     },
//     projectCountFont: {
//         type: ControlType.Font,
//         title: "Count Font",
//         defaultValue: {
//             fontSize: "14px",
//             fontWeight: 400,
//             letterSpacing: "0px",
//         },
//         controls: "extended",
//     },
//     projectCountColor: {
//         type: ControlType.Color,
//         title: "Count Color",
//         defaultValue: "#6b7280",
//     },
//     cardTitleFont: {
//         type: ControlType.Font,
//         title: "Card Title Font",
//         defaultValue: {
//             fontSize: "10px",
//             fontWeight: 500,
//             letterSpacing: "0px",
//         },
//         controls: "extended",
//     },
//     hoverExploreColor: {
//         type: ControlType.Color,
//         title: "Explore Color",
//         defaultValue: "#6b7280",
//     },
//     folderBackColor: {
//         type: ControlType.Color,
//         title: "Folder Back",
//         defaultValue: "#fb923c",
//     },
//     folderFrontColor: {
//         type: ControlType.Color,
//         title: "Folder Front",
//         defaultValue: "#fbbf24",
//     },
//     folderTabColor: {
//         type: ControlType.Color,
//         title: "Folder Tab",
//         defaultValue: "#ea580c",
//     },
//     mainCardBackgroundColor: {
//         type: ControlType.Color,
//         title: "Main Card BG",
//         defaultValue: "#ffffff",
//     },
//     mainCardBorderColor: {
//         type: ControlType.Color,
//         title: "Main Border",
//         defaultValue: "#e5e7eb",
//     },
//     mainCardBorderWidth: {
//         type: ControlType.Number,
//         title: "Main Border Width",
//         defaultValue: 1,
//         min: 0,
//         max: 5,
//         step: 1,
//         displayStepper: true,
//     },
//     mainCardHoverBorderColor: {
//         type: ControlType.Color,
//         title: "Main Hover Border",
//         defaultValue: "#fb923c",
//     },
//     mainCardHoverBorderWidth: {
//         type: ControlType.Number,
//         title: "Main Hover Width",
//         defaultValue: 2,
//         min: 0,
//         max: 5,
//         step: 1,
//         displayStepper: true,
//     },
//     projectCardBackgroundColor: {
//         type: ControlType.Color,
//         title: "Project Card BG",
//         defaultValue: "#ffffff",
//     },
//     projectCardBorderColor: {
//         type: ControlType.Color,
//         title: "Project Border",
//         defaultValue: "#e5e7eb",
//     },
//     projectCardBorderWidth: {
//         type: ControlType.Number,
//         title: "Project Border Width",
//         defaultValue: 1,
//         min: 0,
//         max: 5,
//         step: 1,
//         displayStepper: true,
//     },
//     projectCardHoverBorderColor: {
//         type: ControlType.Color,
//         title: "Project Hover Border",
//         defaultValue: "#fb923c",
//     },
//     projectCardHoverBorderWidth: {
//         type: ControlType.Number,
//         title: "Project Hover Width",
//         defaultValue: 2,
//         min: 0,
//         max: 5,
//         step: 1,
//         displayStepper: true,
//     },
// })
