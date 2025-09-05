# Documents Components

This directory contains modular components for the documents management functionality.

## Components

### DocumentPreview

- **File**: `DocumentPreview.tsx`
- **Purpose**: Modal dialog for previewing documents (PDF and images)
- **Props**:
  - `document: DocumentItem` - The document to preview
  - `onClose: () => void` - Callback when preview is closed

### AddDocumentDialog

- **File**: `AddDocumentDialog.tsx`
- **Purpose**: Dialog for uploading new documents
- **Props**:
  - `isOpen: boolean` - Controls dialog visibility
  - `onOpenChange: (open: boolean) => void` - Callback for dialog state changes
  - `onSubmit: (formData: { name: string; file: File }) => void` - Callback when form is submitted
  - `isLoading?: boolean` - Loading state for submit button

### DocumentCard

- **File**: `DocumentCard.tsx`
- **Purpose**: Individual document card with actions
- **Props**:
  - `document: DocumentItem` - The document data
  - `onView: (document: DocumentItem) => void` - Callback for view action
  - `onDelete: (documentId: number) => void` - Callback for delete action

### DocumentList

- **File**: `DocumentList.tsx`
- **Purpose**: Container component that handles document list display, loading states, and empty states
- **Props**:
  - `documents: DocumentItem[] | null` - Array of documents
  - `isLoading: boolean` - Loading state
  - `error: string | null` - Error message
  - `onView: (document: DocumentItem) => void` - Callback for view action
  - `onDelete: (documentId: number) => void` - Callback for delete action
  - `onAddDocument: () => void` - Callback for add document action

## Types

### DocumentItem

- **File**: `types.ts`
- **Purpose**: Shared interface for document data structure
- **Properties**:
  - `id: number` - Unique document identifier
  - `name: string` - Document name
  - `file: string` - File URL
  - `uploaded_at: string` - Upload timestamp
  - `is_verified: boolean` - Verification status

## Usage

```tsx
import {
  DocumentPreview,
  AddDocumentDialog,
  DocumentCard,
  DocumentList,
  DocumentItem,
} from "@/app/_components/documents";
```

## Benefits of Modular Structure

1. **Reusability**: Components can be used in different parts of the application
2. **Maintainability**: Each component has a single responsibility
3. **Testability**: Individual components can be tested in isolation
4. **Code Organization**: Related functionality is grouped together
5. **Type Safety**: Shared types ensure consistency across components
