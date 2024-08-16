'use client'

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, Fullscreen, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteFile } from '@/lib/r2';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function Pdf({ file, s3 = true }: { file: string, s3?: boolean }) {

    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const src = s3 ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/${file}` : `${file}`;

    const MIN_SCALE = 1.0;

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const newScale = containerWidth / 800; // Adjust 800 based on your PDF page width
                setScale(newScale < MIN_SCALE ? MIN_SCALE : newScale);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage(e: MouseEvent<HTMLButtonElement>) {
        changePage(-1);
    }

    function nextPage(e: MouseEvent<HTMLButtonElement>) {
        changePage(1);
    }

    return (
        <>
            <div
                ref={containerRef}
                className="flex flex-col gap-2 items-center justify-center relative w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Document
                    className="z-10 rounded-lg shadow-lg w-full"
                    file={src}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        className="rounded-lg relative z-20 w-full"
                        pageNumber={pageNumber}
                        scale={scale}
                    >
                        <div className="flex flex-row gap-3 absolute top-2 right-2 z-30">
                            {isHovering && (
                                <>
                                    {/* {isOwner && (
                                        <Trash2
                                            className="cursor-pointer"
                                            color="#E6383C"
                                            onClick={async () => {
                                                await deleteFile(name, true)
                                                queryClient.invalidateQueries({ queryKey: ['files'] })
                                            }}
                                        />
                                    )} */}
                                    <Link href={src} target="_blank" draggable={false} className={`cursor-pointer shadow-lg opacity-0 transition-opacity ease-in-out duration-300 ${isHovering && 'opacity-100'}`}><Fullscreen /></Link>
                                </>
                            )}
                        </div>
                    </Page>
                </Document>
                {isHovering && (
                    <div className={`flex flex-row gap-2 items-center bg-white [box-shadow:0_30px_40px_0_rgba(16,_36,_94,_.2)] w-fit rounded-md absolute bottom-5 z-20 opacity-0 transition-opacity ease-in-out duration-300 ${isHovering && 'opacity-100'}`}>
                        <Button
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                            variant="ghost"
                            className="hover:bg-[#E6E6E6] transition w-fit p-1"
                        >
                            <ChevronLeft />
                        </Button>
                        <div className="flex flex-row gap-1">
                            <p>
                                {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </p>
                        </div>
                        <Button
                            type="button"
                            disabled={numPages ? pageNumber >= numPages : undefined}
                            onClick={nextPage}
                            variant="ghost"
                            className="hover:bg-[#E6E6E6] transition w-fit p-1"
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                )}
                <style>{`
                    .react-pdf__Page__canvas {
                        border-radius: 0.5rem;
                        width: 100% !important;
                        height: auto !important;
                    }

                    .react-pdf__Page__textContent {
                        transform: scale(${scale}) !important;
                        transform-origin: 0 0 !important;
                    }
                `}</style>
            </div >
        </>
    )
}
