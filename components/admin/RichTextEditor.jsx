/**
 * ==============================================================================
 * RENALYTICA RICH TEXT EDITOR COMPONENT (components/admin/RichTextEditor.jsx)
 * ==============================================================================
 * Implementation for SOP 02: Admin Rich Text Management.
 * Powered by Tiptap v2, producing clean semantic HTML for the public_content table.
 * ==============================================================================
 */

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RichTextEditor({ initialContent = '', onChange, placeholder = 'Draft institutional research or market perspective...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (typeof onChange === 'function') {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'renalytica-tiptap-editor prose max-w-none focus:outline-none p-4 min-h-[300px]',
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) {
    return <div className="p-4 text-sm text-gray-500">Initializing Editorial Workspace...</div>;
  }

  return (
    <div className="tiptap-container border border-border-light rounded-xl overflow-hidden bg-canvas-surface">
      {/* Editor Command Toolbar */}
      <div className="tiptap-toolbar flex flex-wrap items-center gap-1 p-2 bg-surface-gray border-b border-border-light text-xs font-mono">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('bold') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
          title="Bold (Cmd+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2.5 py-1 rounded italic ${editor.isActive('italic') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
          title="Italic (Cmd+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2.5 py-1 rounded line-through ${editor.isActive('strike') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
          title="Strikethrough"
        >
          S
        </button>

        <span className="w-px h-4 bg-border-strong mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          H3
        </button>

        <span className="w-px h-4 bg-border-strong mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('bulletList') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('orderedList') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('blockquote') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          “ Quote
        </button>

        <span className="w-px h-4 bg-border-strong mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2.5 py-1 rounded ${editor.isActive('codeBlock') ? 'bg-accent-momentum text-white' : 'hover:bg-border-light'}`}
        >
          &lt;/&gt; Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-2.5 py-1 rounded hover:bg-border-light"
        >
          — Divider
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="tiptap-body min-h-[280px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
