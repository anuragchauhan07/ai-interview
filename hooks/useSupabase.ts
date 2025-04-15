"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const supabase = createClient();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const fetchUserTokens = async () => {
    const user = await getUser();
    if (!user) return null;
    
    const { data, error } = await supabase
      .from("tokens_table")
      .select("tokens")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error('Error fetching tokens:', error);
      return null;
    }

    setUserTokens(data?.tokens || 0);
    return data?.tokens || 0;
  };

  const updateTokens = async (tokensToDeduct: number) => {
    const user = await getUser();
    if (!user) return null;

    const currentTokens = await fetchUserTokens();
    if (currentTokens === null) return null;

    const newTokens = Math.max(0, currentTokens - tokensToDeduct);

    const { data, error } = await supabase
      .from("tokens_table")
      .update({ tokens: newTokens })
      .eq("id", user.id);

    if (error) {
      console.error('Error updating tokens:', error);
      return null;
    }

    setUserTokens(newTokens);
    return newTokens;
  };

  const fetchPreviousQuestions = async () => {
    setLoading(true);
    const user = await getUser();
    if (!user) return [];
    const { data, error } = await supabase.from("questions").select();
    setLoading(false);
    if (error) console.error(error);
    return data || [];
  };

  const saveAnswer = async (question: string, userAnswer: string) => {
    if (!userAnswer) return;
    setLoading(true);
    const user = await getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("questions")
      .insert([{ question, answer: userAnswer, user_id: user.id }]);
    if (error) {
      console.error('Error saving answer:', error);
      return null;
    }
    await fetchPreviousQuestions();
    setLoading(false);
    return data;
  };

  useEffect(() => {
    fetchUserTokens();
  }, []);

  return { 
    fetchPreviousQuestions, 
    saveAnswer, 
    loading, 
    getUser,
    userTokens,
    fetchUserTokens,
    updateTokens
  };
};

export const useUpdateUserTokens = async ({
  userId,
  tokens,
}: {
  userId: string;
  tokens: number;
}) => {
  const supabase = createClient();
  
  // First get current tokens
  const { data: currentData, error: fetchError } = await supabase
    .from("tokens_table")
    .select("tokens")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error(fetchError);
    return null;
  }

  const newTokens = (currentData?.tokens || 0) + tokens;

  // Update with new token count
  const { data, error } = await supabase
    .from("tokens_table")
    .update({ tokens: newTokens })
    .eq("id", userId);

  if (error) console.error(error);
  return data;
};
