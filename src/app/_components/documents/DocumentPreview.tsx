"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import React from "react";
import { DocumentItem } from "./types";

interface DocumentPreviewProps {
  document: DocumentItem;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onClose,
}) => {
  const getFileType = (fileUrl: string) => {
    const extension = fileUrl.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(extension || "")) return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || ""))
      return "image";
    return "unknown";
  };

  const fileType = getFileType(document.file);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {document.name}
          </DialogTitle>
          <DialogDescription>
            Uploaded on {new Date(document.uploaded_at).toLocaleDateString()}
            {document.is_verified && (
              <Badge variant="secondary" className="ml-2">
                Verified
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {fileType === "pdf" ? (
            <iframe
              src={document.file}
              className="w-full h-[600px] border rounded-lg"
              title={document.name}
            />
          ) : fileType === "image" ? (
            <img
              src={document.file}
              alt={document.name}
              className="w-full h-auto max-h-[600px] object-contain border rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">
                  Preview not available for this file type
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => window.open(document.file, "_blank")}
                >
                  Open in new tab
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.open(document.file, "_blank")}>
            Open in new tab
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;
