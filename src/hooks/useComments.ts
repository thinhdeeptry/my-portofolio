import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  created_at: string;
  content: string;
  author: string;
  avatar_url?: string;
  is_pinned?: boolean;
  is_admin?: boolean;
}

export interface CommentInput {
  content: string;
  author: string;
  avatar_file?: File | null;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tải comments từ Supabase
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setComments(data || []);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      setError(err.message || 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  // Upload file và trả về URL
  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!file) return null;
    
    try {
      // Tạo tên file duy nhất
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      // Upload file lên bucket 'avatars'
      const { error } = await supabase.storage
        .from('avatar-portfolio')
        .upload(fileName, file);
      
      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }
      
      // Lấy URL công khai
      const { data } = supabase.storage
        .from('avatar-portfolio')
        .getPublicUrl(fileName);
      
      return data.publicUrl;
    } catch (err) {
      console.error('Error in avatar upload:', err);
      return null;
    }
  };

  // Thêm comment mới
  const addComment = async ({ content, author, avatar_file }: CommentInput): Promise<boolean> => {
    try {
      // Upload avatar nếu có
      let avatar_url = undefined;
      if (avatar_file) {
        avatar_url = await uploadAvatar(avatar_file);
      }
      
      // Thêm comment vào database
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            content,
            author,
            avatar_url,
            is_admin: false,
            is_pinned: false
          }
        ]);
      
      if (error) throw error;
      
      // Tải lại comments sau khi thêm
      await fetchComments();
      return true;
    } catch (err: any) {
      console.error('Error adding comment:', err);
      setError(err.message || 'Failed to add comment');
      return false;
    }
  };

  // Tải comments khi component mount
  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    isLoading,
    error,
    addComment,
    refreshComments: fetchComments
  };
};