import { getUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  const user = data?.data || data;

  return { user, ...rest };
};

export default useAuth;