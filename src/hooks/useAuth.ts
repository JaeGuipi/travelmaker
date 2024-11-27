"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyInfo } from "@/lib/api/user";
import { loginUser, logoutUser } from "@/lib/api/auth";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 유저 정보 가져오기
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await getMyInfo();
    },
    enabled: false,
  });

  // 로그인 처리
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      refetch();
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });

  // 로그아웃 처리
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
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
