"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Komentár obsahuje id, user, text, likes, replies
interface Comment {
  id: string;
  user: string;
  text: string;
  likes: number;
  replies: Comment[];
}

interface CommentsSectionProps {
  articleId: string;
}

export default function CommentsSection({ articleId }: CommentsSectionProps) {
  const { data: session } = useSession();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Ak používateľ klikne "Odpovedať" na nejaký komentár, uložím si jeho ID do replyParentId
  // a do replyText píšem obsah odpovede.
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Načítanie komentárov z API
  async function loadComments() {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?articleId=${articleId}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Chyba pri načítavaní komentárov:", error);
    } finally {
      setLoading(false);
    }
  }

  // Pridanie top-level komentára
  async function handleSubmitTopLevel() {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          text: newComment,
          user: session?.user?.name || "Anonym",
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setNewComment("");
      await loadComments();
    } catch (error) {
      console.error("Chyba pri odoslaní komentára:", error);
    }
  }

  // Pridanie odpovede (subkomentára)
  async function handleSubmitReply() {
    if (!replyText.trim() || !replyParentId) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          text: replyText,
          user: session?.user?.name || "Anonym",
          parentCommentId: replyParentId,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setReplyText("");
      setReplyParentId(null);
      await loadComments();
    } catch (error) {
      console.error("Chyba pri odoslaní odpovede:", error);
    }
  }

  // Toggle like/unlike na základe commentId
  async function handleLike(commentId: string) {
    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          commentId,
        }),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      await loadComments();
    } catch (error) {
      console.error("Chyba pri like/unlike komentára:", error);
    }
  }

  function handleKeyDownTopLevel(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitTopLevel();
    }
  }

  function handleKeyDownReply(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
  }

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Rekurzívne vykreslenie komentára (vrátane subkomentárov).
   * Ak comment.id === replyParentId, zobrazíme formulár priamo pod týmto komentárom.
   */
  function renderComment(comment: Comment, depth: number = 0) {
    const marginLeft = depth * 20;

    return (
      <div key={comment.id} style={{ marginLeft }}>
        <p className="break-all whitespace-pre-wrap">
          <strong>{comment.user}:</strong> {comment.text}
        </p>
        <div className="flex items-center gap-2 mt-1 mb-2">
          <span>{comment.likes}</span>
          {session && (
            <button
              onClick={() => handleLike(comment.id)}
              className="text-red-500 hover:text-red-600 transition transform hover:scale-110 cursor-pointer"
            >
              ❤️
            </button>
          )}
          {session && (
            <button
              onClick={() => {
                // Klikol som "Odpovedať" -> nastaviť parentId
                setReplyParentId(comment.id);
                setReplyText("");
              }}
              className="text-white hover:text-indigo-600 cursor-pointer"
            >
              Odpovedať
            </button>
          )}
        </div>

        {/* Ak comment.id === replyParentId, zobraz formulár priamo pod týmto komentárom */}
        {replyParentId === comment.id && (
          <div className="mb-4 p-2 rounded">
            {/* <p className="text-sm text-gray-400 mb-1">
              Odpovedáš na komentár ID: {comment.id}
            </p> */}
            <div className="flex gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDownReply}
                placeholder="Napíš odpoveď..."
                maxLength={1000}
                className="
                  border p-2 flex-grow w-full resize-none
                  break-words
                  overflow-y-auto
                  hide-scrollbar
                "
              />
              <button
                onClick={handleSubmitReply}
                className="bg-blue-500 hover:bg-indigo-600 transition-colors duration-200 text-white px-4 py-2 rounded cursor-pointer"
                disabled={!replyText.trim()}
              >
                Odpovedať
              </button>
            </div>
            <button
              onClick={() => {
                setReplyParentId(null);
                setReplyText("");
              }}
              className="text-xs text-white mt-1 hover:text-indigo-600 cursor-pointer"
            >
              Zrušiť
            </button>
          </div>
        )}

        {/* Rekurzívne zobrazíme subkomentáre */}
        {comment.replies.map((child) => renderComment(child, depth + 1))}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Komentáre</h3>

      {loading ? (
        <p>Načítavam komentáre...</p>
      ) : comments.length === 0 ? (
        <p>(Žiadne komentáre)</p>
      ) : (
        <div className="mb-4">{comments.map((c) => renderComment(c, 0))}</div>
      )}

      {!session ? (
        <p className="text-white p-4">
          Pre pridanie komentára sa prosím{" "}
          <Link href="/login" className="underline font-semibold">
            prihlás
          </Link>
          .
        </p>
      ) : (
        // Top-level formulár
        <div className="flex gap-2 mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDownTopLevel}
            placeholder="Napíš komentár..."
            maxLength={1000}
            className="
              border p-2 flex-grow w-full resize-none
              break-words
              overflow-y-auto
              hide-scrollbar
            "
          />
          <button
            onClick={handleSubmitTopLevel}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white px-4 py-2 rounded cursor-pointer"
            disabled={!newComment.trim()}
          >
            Pridať
          </button>
        </div>
      )}
    </div>
  );
}
