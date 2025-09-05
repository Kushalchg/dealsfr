"use client";

import {
  AddDocumentDialog,
  DocumentItem,
  DocumentList,
  DocumentPreview,
} from "@/app/_components/documents";
import { Button } from "@/components/ui/button";
import {
  createStoreDocuments,
  deleteStoreDocuments,
  getStoreDocumentsList,
} from "@/redux/features/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const DocumentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { storeDocumentsData, storeDocumentsError, documentsStateLoading } =
    useAppSelector((state) => state.store);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(
    null
  );

  // Get store ID from Redux state or URL params
  const { storeDetailData } = useAppSelector((state) => state.store);
  const storeId = storeDetailData && storeDetailData.id || 0

  const handleAddDocument = async (formData: { name: string; file: File }) => {
    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("file", formData.file);

    try {
      await dispatch(
        createStoreDocuments({ payload: uploadData, s_id: storeId })
      ).unwrap();
      toast.success("Document uploaded successfully");
      setIsAddDialogOpen(false);
      // Refresh the documents list
      dispatch(getStoreDocumentsList(storeId));
    } catch (error) {
      toast.error("Failed to upload document");
    }
  };

  const handleDelete = async (documentId: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await dispatch(
          deleteStoreDocuments({ s_id: storeId, id: documentId })
        ).unwrap();
        toast.success("Document deleted successfully");
        // Refresh the documents list
        dispatch(getStoreDocumentsList(storeId));
      } catch (error) {
        toast.error("Failed to delete document");
      }
    }
  };

  const handleViewDocument = (document: DocumentItem) => {
    setPreviewDocument(document);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-foreground">
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="">Manage your store documents</p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
      </div>

      <DocumentList
        documents={storeDocumentsData}
        isLoading={documentsStateLoading}
        error={storeDocumentsError}
        onView={handleViewDocument}
        onDelete={handleDelete}
        onAddDocument={() => setIsAddDialogOpen(true)}
      />

      <AddDocumentDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddDocument}
        isLoading={documentsStateLoading}
      />

      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
