import { Button, Text, theme as GnosisTheme } from "@gnosis.pm/safe-react-components";
import { createStyles } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Web3Storage } from 'web3.storage';
import { useLocalStorage } from 'usehooks-ts'

const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMwNjVlZmU1MDYxOTJiQWRiODczNDJDZDhGNUUwRDJiZkFjMzlCZWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5MDI5MTg3OTcsIm5hbWUiOiJoYWNrZmV2bSJ9.C0YvhqPTYH7V8TVzqoG5ctEHAQlCVcCoB4eSDyL6xzo" });

export type FileUploadProps = {
  onChange:(arg0: string) => void;
};


export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const { onChange } = props;
  const [rootCid, setRootCID] = useLocalStorage('CID','test');
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      async function uploadFiles() {
            if(acceptedFiles.length > 0){
              const tempRootCid = await client.put(acceptedFiles, {
                name: 'hack fevm',
                maxRetries: 3,
              });
              console.log(tempRootCid)
              setRootCID(tempRootCid)
              // console.log('rootCid ---', rootCid);

            }
        };
      uploadFiles();
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        console.log("We got a file");
        reader.onload = function (evt) {
          if (!evt.target) {
            return;
          }
          onChange(evt.target.result as string);
        };
        reader.readAsText(file);
      });
    },
    [onChange, rootCid],
  );



  const { //acceptedFiles, 
    getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: {
      text: [".csv",".txt"],
    },
  });

  const style = useMemo(
    () => ({
      ...styles.baseStyle,
      ...(isDragActive ? styles.activeStyle : {}),
      ...(isDragAccept ? styles.acceptStyle : {}),
      ...(isDragReject ? styles.rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button size="md" variant="contained" color="primary" component="span">
            Upload CSV/TXT File
          </Button>
          <Text center size="lg">
            or drop file here
          </Text>
        </div>
      </div>
    </div>
  );
};

const styles = createStyles({
  baseStyle: {
    lex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "rgba(0, 0, 0, 0.23)",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  activeStyle: {
    borderColor: "#2196f3",
  },
  acceptStyle: {
    borderColor: GnosisTheme.colors.primary,
  },
  rejectStyle: {
    borderColor: GnosisTheme.colors.error,
  },
});