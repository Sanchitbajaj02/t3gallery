"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { usePostHog } from "posthog-js/react";
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

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
}

export default function SimpleUploadButton() {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => {
      posthog.capture("upload_begin");
      toast(
        <div className="flex items-center gap-2 text-white">
          <LoadingSpinnerSVG /> <span className="text-lg">Uploading...</span>
        </div>,
        {
          duration: 100000,
          id: "begin-upload",
        },
      );
    },
    onUploadError: (error) => {
      toast.dismiss("begin-upload");
      posthog.capture("upload_error", { error });
      toast.error("Upload failed!");
    },
    onClientUploadComplete: () => {
      toast.dismiss("begin-upload");
      toast.success("Upload Complete!");
      router.refresh();
    },
  });

  return (
    <div className="rounded-md bg-white p-1 text-black hover:bg-gray-100">
      <label
        htmlFor="upload-button"
        className="cursor-pointer"
        data-ut-element="button"
      >
        {/* <UploadSVG /> */}
        <Upload />
      </label>
      <input
        type="file"
        id="upload-button"
        name="upload-button"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
