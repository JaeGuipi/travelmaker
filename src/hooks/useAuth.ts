"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyInfo } from "@/lib/api/user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 유저 정보 가져오기
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMyInfo,
  });

  // 로그인 처리
  const loginMutation = useMutation({
    //mutationFn: 로그인 api,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });

  // 로그아웃 처리
  const logoutMutation = useMutation({
    //mutationFn: 로그아웃 api,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login");
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
    },
  });

  return {
    user,
    isPending,
    isError,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
