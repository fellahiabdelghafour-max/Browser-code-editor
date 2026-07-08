'use client'
import { createContext, useState, ReactNode, useContext } from "react";
import { Id } from "../convex/_generated/dataModel";

interface valueProps {
  FileId: Id<'Files'>|undefined;
  setFileId: (FileId: Id<'Files'>) => void;
}

const BodyFilesContext = createContext<valueProps | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export default function FileProvider({ children }: FileProviderProps) {
  const [FileId, setFileId] = useState<Id<'Files'>|undefined>(undefined);

  return (
    <BodyFilesContext.Provider value={{ FileId, setFileId }}>
      {children}
    </BodyFilesContext.Provider>
  );
}

export const useFileBodyContext=()=>useContext(BodyFilesContext)
