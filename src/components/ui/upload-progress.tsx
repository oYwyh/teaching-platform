export default function UploadProgress({ uploadProgress }: { uploadProgress: number }) {
    return (
        <div className="w-full mt-2">
            <div className="bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{uploadProgress}%</span>
        </div>
    )
}