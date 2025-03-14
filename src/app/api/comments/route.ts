import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Rozšírená definícia komentára: id, user, text, likes, likedBy, replies
type CommentData = {
  id: string;
  user: string;
  text: string;
  likes: number;
  likedBy: string[];
  replies: CommentData[];
};

// In-memory uloženie
const comments: { [articleId: string]: CommentData[] } = {};

/**
 * Rekurzívne vyhľadanie komentára podľa ID v strome (top-level + sub-komentáre).
 */
function findCommentById(
  commentList: CommentData[],
  id: string
): CommentData | null {
  for (const c of commentList) {
    if (c.id === id) return c;
    const found = findCommentById(c.replies, id);
    if (found) return found;
  }
  return null;
}

// POST -> pridanie nového komentára alebo odpovede
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { articleId, text, user, parentCommentId } = data;

    if (!articleId || !text) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Inicializujeme pole pre daný articleId, ak ešte neexistuje
    if (!comments[articleId]) {
      comments[articleId] = [];
    }

    const userName = user ?? session.user?.name ?? "Anonym";

    // Vytvoríme nový komentár
    const newComment: CommentData = {
      id: crypto.randomUUID(),
      user: userName,
      text,
      likes: 0,
      likedBy: [],
      replies: [],
    };

    if (!parentCommentId) {
      // Top-level komentár
      comments[articleId].push(newComment);
    } else {
      // Odpoveď na iný komentár
      const parent = findCommentById(comments[articleId], parentCommentId);
      if (!parent) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
      parent.replies.push(newComment);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chyba pri POST /api/comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET -> získanie komentárov
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { error: "No articleId provided" },
        { status: 400 }
      );
    }

    const articleComments = comments[articleId] ?? [];
    return NextResponse.json(articleComments);
  } catch (error) {
    console.error("Chyba pri GET /api/comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH -> toggle like/unlike na základe commentId (rekurzívne)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { articleId, commentId } = body;

    if (!articleId || !commentId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Over session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Nájdem komentár rekurzívne
    const comment = findCommentById(comments[articleId] ?? [], commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Unikátne ID používateľa (email alebo meno)
    const userId = session.user?.email || session.user?.name;
    if (!userId) {
      return NextResponse.json(
        { error: "Cannot identify user" },
        { status: 400 }
      );
    }

    // Toggle like/unlike
    if (comment.likedBy.includes(userId)) {
      // UNLIKE
      comment.likedBy = comment.likedBy.filter((id) => id !== userId);
      comment.likes -= 1;
    } else {
      // LIKE
      comment.likedBy.push(userId);
      comment.likes += 1;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chyba pri PATCH /api/comments (toggle like):", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
