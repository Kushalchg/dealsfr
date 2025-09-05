"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, FileText, Plus } from "lucide-react";
import React from "react";
import DocumentCard from "./DocumentCard";
import { DocumentItem } from "./types";

interface DocumentListProps {
  documents: DocumentItem[] | null;
  isLoading: boolean;
  error: string | null;
  onView: (document: DocumentItem) => void;
  onDelete: (documentId: number) => void;
  onAddDocument: () => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  isLoading,
  error,
  onView,
  onDelete,
  onAddDocument,
}) => {
  if (isLoading && !documents) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Documents</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <div>
          <h4 className="font-medium">Error loading documents</h4>
          <p className="text-sm">{error}</p>
        </div>
      </Alert>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No documents found</h3>
        <p className="text-gray-600 mb-4">
          Upload your first document to get started
        </p>
        <Button onClick={onAddDocument}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DocumentList;
