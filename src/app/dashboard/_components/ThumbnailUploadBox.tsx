import { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import FileUploader from '@/app/_components/FileUploader';

export default function ThumbnailUploadBox() {
    const [thumbnail, setThumbnail] = useState<string>('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(thumbnail)
    }, [thumbnail])

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-8 p-4 border border-dashed border-gray-300 rounded-lg"
            onClick={() => setOpen(true)}
        >
            <FileUploader open={open} setOpen={setOpen} setState={setThumbnail} />

            <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
            >
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt="Thumbnail Preview"
                        className="object-cover w-full h-full rounded-md"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <Upload className="w-10 h-10 mb-2" />
                        <span className="text-sm">Upload Course Thumbnail</span>
                        <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                    </div>
                )}
            </label>
            {thumbnail && (
                <button
                    onClick={() => setThumbnail(null)}
                    className="mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    Remove Thumbnail
                </button>
            )}
        </div>
    );
}
