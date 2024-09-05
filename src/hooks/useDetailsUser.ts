import userService from "@/services/user-service/user.service";
import { User } from "@/shared/intreface/user.interface";
import { useQuery } from "@tanstack/react-query";

export const useDetailsUser = (id: number): User | undefined => {
  return useQuery({
    queryKey: ["detailsUser", id],
    queryFn: () => userService.findOne(id),
  }).data;
};
