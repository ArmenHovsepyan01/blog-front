"use client";

import React, { FC, useState } from "react";
import style from "./Upload.module.scss";
import { Box, Button, TextField } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ControllerRenderProps } from "react-hook-form";
import {
  Cancel,
  CancelOutlined,
  Delete,
  UploadFile,
  UploadFileRounded,
  UploadRounded,
} from "@mui/icons-material";
import Image from "next/image";

interface IUpload {
  setImage: (image: File | null) => void;
  field: ControllerRenderProps<
    { image?: any; title: string; content: string },
    "image"
  >;
  image: File;
}

function fileToBlob(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const Upload: FC<IUpload> = ({ setImage, field }) => {
  const [src, setSrc] = useState<string>("");

  const resetImage = () => {
    setImage(null);
    setSrc("");
  };

  return (
    <Box display={"flex"} gap={1} flexDirection={"column"}>
      <div
        style={{
          width: 400,
          height: 400,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className={src ? style.borderNone : style.dashedBorder}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          // @ts-ignore
          e.target.style.borderColor = "black";
          // Add visual feedback when dragging over the container
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          // @ts-ignore
          e.target.style.backgroundColor = "gray";

          // Reset visual feedback when leaving the container
        }}
        onDrop={async (e) => {
          e.preventDefault();
          const droppedFiles = e.dataTransfer.files;
          if (droppedFiles && droppedFiles.length > 0) {
            field.onChange(droppedFiles[0]);
            setImage(droppedFiles[0]);
            const imageBlob = await fileToBlob(droppedFiles[0]);
            setSrc(imageBlob as string);
          }
        }}
      >
        {src && (
          <Image src={src} alt={"alt"} layout={"fill"} objectFit={"cover"} />
        )}

        {src && (
          <Cancel
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              backgroundColor: "gray",
              borderRadius: 4,
            }}
            onClick={resetImage}
          />
        )}
        {!src && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<UploadFile />}
            >
              Upload file
              <TextField
                type="file"
                sx={visuallyHidden}
                onChange={async (e) => {
                  //   @ts-ignore
                  const image = e.target.files[0];
                  const imageBlob = await fileToBlob(image);
                  setSrc(imageBlob as string);
                  setImage(image);
                  field.onChange(image);
                }}
              />
            </Button>
            <span>Drag and drop image to upload it.</span>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Upload;
