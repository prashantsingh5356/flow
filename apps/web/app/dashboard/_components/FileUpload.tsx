"use client";

import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile, ActualFileObject } from "filepond";

registerPlugin(FilePondPluginImagePreview);

const FileUpload = () => {
  const [files, setFiles] = useState<ActualFileObject[]>([]);
  const [uploadedUrl, setUploadedUrl] = useState("");

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          const actualFiles = fileItems
            .map((f) => f.file)
            .filter(Boolean) as ActualFileObject[];
          setFiles(actualFiles);
        }}
        allowMultiple={false}
        server={{
          process: {
            url: "/api/v1/upload",
            method: "POST",
            onload: (response) => {
              const data = JSON.parse(response);
              setUploadedUrl(data.url);

              return data.url;
            },
          },
        }}
        name="file"
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      />

      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="w-64 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
