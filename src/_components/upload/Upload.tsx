"use client";

import React, { FC, useRef, useState } from "react";

import style from "./Upload.module.scss";

import { Box, Button, TextField } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ControllerRenderProps } from "react-hook-form";
import { Cancel, UploadFile } from "@mui/icons-material";

import Image from "next/image";

interface IUpload {
  setImage: (image: File | null) => void;
  field: ControllerRenderProps<
    { image?: any; title: string; content: string },
    "image"
  >;
  image: File;
  imageUrl?: string;
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

const Upload: FC<IUpload> = ({ setImage, field, imageUrl }) => {
  const [src, setSrc] = useState<string>(
    imageUrl ? `http://localhost:5000/api/images/${imageUrl}` : "",
  );
  const divRef = useRef(null);

  const resetImage = () => {
    setImage(null);
    setSrc("");
  };

  return (
    <Box display={"flex"} gap={1} flexDirection={"column"}>
      <div
        ref={divRef}
        style={{
          width: "100%",
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
          divRef.current.style.backgroundColor = "#dedede";
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          // @ts-ignore
          divRef.current.style.backgroundColor = "transparent";
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
