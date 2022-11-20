import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-text";
import styled from "styled-components";


const EditorWrapper = styled.div``;

export type FileEditorProps = {
  onChange: (csvContent: string) => void;
  csvText: string;
};

export const FileEditor = (props: FileEditorProps): JSX.Element => {
  return (
    <EditorWrapper>
      <AceEditor
        onChange={(newCode:any) => props.onChange(newCode)}
        value={props.csvText}
        theme="tomorrow"
        width={"100%"}
        mode={"text"}
        minLines={6}
        maxLines={20}
        setOptions={{
          firstLineNumber: 0,
        }}
        showPrintMargin={false}
        style={{
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderRadius: "4px",
          borderStyle: "solid",
          boxShadow: "#F7F5F5 1px 2px 4px 0px",
        }}
      />
    </EditorWrapper>
  );
};