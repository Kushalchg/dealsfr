"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, FileText, Trash2 } from "lucide-react";
import React from "react";
import { DocumentItem } from "./types";

interface DocumentCardProps {
  document: DocumentItem;
  onView: (document: DocumentItem) => void;
  onDelete: (documentId: number) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
  onDelete,
}) => {

  const getFileIcon = (fileUrl: string) => {
    const extension = fileUrl.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(extension || "")) return "📄";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || ""))
      return "🖼️";
    return "📁";
  };

  const getFileType = (fileUrl: string) => {
    const extension = fileUrl.split(".").pop()?.toLowerCase();
    if (["pdf"].includes(extension || "")) return "pdf";
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || ""))
      return "image";
    return "file";
  };


  const fileType = getFileType(document.file)


  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getFileIcon(document.file)}</span>
          <div>
            <h3 className="font-medium text-sm truncate" title={document.name}>
              {document.name}
            </h3>
            <p className="text-xs text-gray-500">
              {getFileType(document.file)}
            </p>
          </div>
          <div>
            {fileType === "pdf" ? (
              <iframe
                src={document.file}
                className="w-full max-h-[600px] border rounded-lg"
                title={document.name}
              />
            ) : fileType === "image" ? (
              <img
                src={document.file}
                alt={document.name}
                className="w-full h-auto max-h-[600px] object-contain border rounded-lg"
              />
            ) :
              (
                <img
                  src={document.file}
                  alt={document.name}
                  className="w-full h-auto max-h-[600px] object-contain border rounded-lg"
                />
              )
            }
          </div>
        </div>
        {document.is_verified && (
          <Badge variant="secondary" className="text-xs">
            Verified
          </Badge>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Uploaded {new Date(document.uploaded_at).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onView(document)}
        >
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(document.file, "_blank")}
        >
          <FileText className="h-3 w-3 mr-1" />
          Open
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(document.id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default DocumentCard;
