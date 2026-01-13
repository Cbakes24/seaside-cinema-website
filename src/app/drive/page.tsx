"use client";

import React, { useState } from 'react';

interface DriveItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: string; // 'pdf', 'doc', 'image', etc.
  size?: string;
  modified: string;
  parentId: string | null;
}

export default function DrivePage() {
  const [items, setItems] = useState<DriveItem[]>([
    {
      id: '1',
      name: 'My Documents',
      type: 'folder',
      modified: '2024-01-15',
      parentId: null,
    },
    {
      id: '2',
      name: 'Project Proposal.pdf',
      type: 'file',
      fileType: 'pdf',
      size: '2.4 MB',
      modified: '2024-01-14',
      parentId: null,
    },
    {
      id: '3',
      name: 'Meeting Notes.docx',
      type: 'file',
      fileType: 'doc',
      size: '156 KB',
      modified: '2024-01-13',
      parentId: null,
    },
  ]);

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [newItemName, setNewItemName] = useState('');
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItemType, setNewItemType] = useState<'folder' | 'file'>('folder');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentItems = items.filter(item => item.parentId === currentFolderId);

  const createItem = () => {
    if (!newItemName.trim()) return;

    const newItem: DriveItem = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
      modified: new Date().toISOString().split('T')[0],
      parentId: currentFolderId,
      ...(newItemType === 'file' && {
        fileType: 'doc',
        size: '0 KB',
      }),
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setShowNewItemDialog(false);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id && item.parentId !== id));
  };

  const deleteSelected = () => {
    const idsToDelete = Array.from(selectedItems);
    setItems(items.filter(item => !idsToDelete.includes(item.id) && !idsToDelete.includes(item.parentId || '')));
    setSelectedItems(new Set());
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const navigateToFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setSelectedItems(new Set());
  };

  const navigateUp = () => {
    const currentFolder = items.find(item => item.id === currentFolderId);
    setCurrentFolderId(currentFolder?.parentId || null);
    setSelectedItems(new Set());
  };

  const getFileIcon = (item: DriveItem) => {
    if (item.type === 'folder') {
      return '📁';
    }
    switch (item.fileType) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      default:
        return '📄';
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolderId;
    
    while (currentId) {
      const folder = items.find(item => item.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">My Drive</h1>
            {currentFolderId && (
              <button
                onClick={navigateUp}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                ← Back
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {viewMode === 'grid' ? '☰ List' : '⊞ Grid'}
            </button>
            <button
              onClick={() => {
                setNewItemType('folder');
                setShowNewItemDialog(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New Folder
            </button>
            <button
              onClick={() => {
                setNewItemType('file');
                setShowNewItemDialog(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + New File
            </button>
            {selectedItems.size > 0 && (
              <button
                onClick={deleteSelected}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete ({selectedItems.size})
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {getBreadcrumbs().length > 0 && (
          <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
            <button onClick={() => setCurrentFolderId(null)} className="hover:text-gray-800">
              My Drive
            </button>
            {getBreadcrumbs().map((folder, index) => (
              <React.Fragment key={folder.id}>
                <span>/</span>
                <button
                  onClick={() => setCurrentFolderId(folder.id)}
                  className="hover:text-gray-800"
                >
                  {folder.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.type === 'folder') {
                    navigateToFolder(item.id);
                  } else {
                    toggleSelection(item.id);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleSelection(item.id);
                }}
                className={`p-4 bg-white rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedItems.has(item.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-5xl mb-2 text-center">{getFileIcon(item)}</div>
                <div className="text-sm font-medium text-gray-800 truncate text-center">
                  {item.name}
                </div>
                {item.type === 'file' && (
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {item.size}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <input
                      type="checkbox"
                      checked={selectedItems.size === currentItems.length && currentItems.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(new Set(currentItems.map(item => item.id)));
                        } else {
                          setSelectedItems(new Set());
                        }
                      }}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Modified
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (item.type === 'folder') {
                        navigateToFolder(item.id);
                      } else {
                        toggleSelection(item.id);
                      }
                    }}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedItems.has(item.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{getFileIcon(item)}</span>
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.size || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.modified}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📁</div>
            <p>This folder is empty</p>
            <p className="text-sm mt-2">Create a new folder or file to get started</p>
          </div>
        )}
      </div>

      {/* New Item Dialog */}
      {showNewItemDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              New {newItemType === 'folder' ? 'Folder' : 'File'}
            </h2>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Enter ${newItemType} name`}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  createItem();
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowNewItemDialog(false);
                  setNewItemName('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createItem}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
