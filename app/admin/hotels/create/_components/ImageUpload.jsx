"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback } from "react";

export default function ImageUpload({
    label,
    subLabel,
    value,
    onChange,
    onRemove,
    multiple = false,
    id
}) {

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        if (multiple) {
            // For array of files
            onChange(files);
        } else {
            // For single file
            onChange(files[0]);
        }
    };

    // Helper to get preview URL
    const getPreview = (file) => {
        if (typeof file === 'string') return file; // Already a URL
        return URL.createObjectURL(file);
    };

    return (
        <div className="col-span-full">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            {subLabel && (
                <p className="text-xs text-gray-500 mb-2">{subLabel}</p>
            )}

            {/* Preview Area */}
            <div className="mt-2 mb-4 flex gap-4 flex-wrap">
                {multiple && Array.isArray(value) && value.map((file, idx) => (
                    <div key={idx} className="relative h-24 w-24 rounded-lg overflow-hidden border border-gray-200 group">
                        <Image
                            src={getPreview(file)}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <XMarkIcon className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {!multiple && value && (
                    <div className="relative h-40 w-full sm:w-64 rounded-lg overflow-hidden border border-gray-200 group">
                        <Image
                            src={getPreview(value)}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove()}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Upload Box - Hidden if single mode and value exists */}
            {(!value || multiple) && (
                <label
                    htmlFor={id}
                    className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer relative"
                >
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <span className="relative rounded-md bg-transparent font-semibold text-primary focus-within:outline-none hover:text-primary/80">
                                <span>Upload a file</span>
                                <input
                                    id={id}
                                    name={id}
                                    type="file"
                                    className="sr-only"
                                    multiple={multiple}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </span>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </label>
            )}
        </div>
    );
}
