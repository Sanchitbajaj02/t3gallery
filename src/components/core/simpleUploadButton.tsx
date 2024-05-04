"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

// Simple Hook for upload thing
const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export default function SimpleUploadButton() {
  const router = useRouter();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onClientUploadComplete: () => {
      router.refresh();
    },
    onUploadBegin: () => {
      alert("uploading has been started");
    },
  });

  return (
    <>
      <label
        htmlFor="upload-button"
        className="cursor-pointer"
        data-ut-element="button"
      >
        <UploadSVG />
      </label>
      <input
        type="file"
        id="upload-button"
        name="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </>
  );
}