import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "./services";
import { QUERY_KEY } from "@/data/types/constants";
import {
    TEmailParamsFields,
    TForgejoPathFields,
} from "@/data/types/UsersTypes";

export const useRegisterQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: api.register,
        onSuccess: async (data) => {
            await queryClient.setQueryData([QUERY_KEY.user], data);
            toast.success("Вы успешно зарегистрировались!");
            navigate("/home");
        },
        onError(error) {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Ошибка! Попробуйте снова.");
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.user],
            });
        },
    });
};

export const useLoginQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: api.login,
        onSuccess: async (data) => {
            await queryClient.setQueryData([QUERY_KEY.user], data);
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.user],
                refetchType: "none",
            });
            navigate("/home");
        },
    });
};

export const useLogOutQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const onLogOut = useCallback(async () => {
        await api.logout();
        queryClient.removeQueries();
        navigate("/login");
    }, [navigate, queryClient]);
    return onLogOut;
};

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: [QUERY_KEY.user],
        queryFn: () => api.getUserInfo(),
        staleTime: 1000 * 60 * 30,
        // gcTime: 1000 * 60 * 60 * 24,
        // retry: false,
    });
};

export const useChangeStudentsThemeTeacherStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.changeStudentThemeTeacherStatus,
        onSuccess: async (data) => {
            await queryClient.setQueryData([QUERY_KEY.user], data);
            toast.success("Обновлено успешно!");
        },
        onError: () => {
            toast.error(
                "Ошибка! Попробуйте обновить страницу и попробовать снова."
            );
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.user],
                // refetchType: "none",
            });
        },
    });
};

export const useFetchAllTeachers = () => {
    return useQuery({
        queryKey: [QUERY_KEY.teachers],
        queryFn: api.fetchAllTeachers,
        gcTime: Infinity,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useFetchAllStudents = () => {
    return useQuery({
        queryKey: [QUERY_KEY.students],
        queryFn: api.fetchAllStudents,
        gcTime: 1000 * 60 * 60,
        // staleTime: 1000 * 60 * 30,
    });
};

export const useFetchStatuses = () => {
    return useQuery({
        queryKey: [QUERY_KEY.statusList],
        queryFn: api.fetchStatuses,
        gcTime: Infinity,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useFetchStudentsQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEY.students],
        queryFn: () => api.fetchStudents(),
        refetchOnWindowFocus: true,
        // notifyOnChangeProps: "all",
        gcTime: 1000 * 60 * 60,
    });
};

export const useApproveStudentQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ studEmail, params }: TEmailParamsFields) =>
            api.teacherUpdateStudentsActions({ studEmail, params }),
        onError: (error) => {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error(
                    "Ошибка! Попробуйте обновить страницу и попробовать снова."
                );
            }
        },
        onSuccess: () => {
            toast.success("Обновлено успешно!");
            // await queryClient.setQueryData([QUERY_KEY.students], data);
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.students],
                // refetchType: "none",
            });
        },
    });
};

export const useAdminsActionsQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.adminUpdateStudentsActions,
        onError: () => {
            toast.error(
                "Ошибка! Попробуйте обновить страницу и попробовать снова."
            );
        },
        onSuccess: () => {
            toast.success("Обновлено успешно!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.students] });
        },
    });
};

export const useDeleteUserQuery = (
    who: "student" | "teacher",
    email: string
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.deleteUser(who, email),
        onSuccess: () => {
            toast.success("Пользователь удален!");
        },
        onError: (error) => {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Ошибка! Не удалось удалить пользователя!");
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [`${who}s`],
            });
        },
    });
};

// --------------------------- FORGEJO ---------------------------
export const useUploadFileToForgejo = () => {
    return useMutation({
        mutationFn: api.uploadFileToForgejo,
        onSuccess(data) {
            if (data.message) {
                toast.success(data.message);
            } else {
                toast.success("Сохранено!");
            }
        },
        onError(error) {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Ошибка!");
            }
        },
    });
};

export const useGetForgejoFileContent = ({
    email,
    repo,
    filepath,
    method,
}: TForgejoPathFields) => {
    return useQuery({
        queryKey: [QUERY_KEY.forgejo],
        queryFn: () =>
            api.crudForgejoFileContent({ email, repo, filepath, method }),
        gcTime: Infinity,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useUpdateForgejoFileContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.crudForgejoFileContent,
        onSuccess(data) {
            queryClient.setQueryData([QUERY_KEY.forgejo], data);
            toast.success("Сохранено успешно!");
        },
        onError(error) {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Ошибка!");
            }
        },
    });
};

export const useFetchInstDirecDepartQuery = ({
    option,
}: {
    option: "institutes" | "directions" | "departments";
}) => {
    let query = useQuery({
        queryKey: [QUERY_KEY.institutes],
        queryFn: api.fetchInstitutes,
        gcTime: Infinity,
        staleTime: Infinity,
    });
    if (option === "directions") {
        query = useQuery({
            queryKey: [QUERY_KEY.directions],
            queryFn: api.fetchDirections,
            gcTime: Infinity,
            staleTime: Infinity,
        });
    } else if (option === "departments") {
        query = useQuery({
            queryKey: [QUERY_KEY.departments],
            queryFn: api.fetchDepartments,
            gcTime: Infinity,
            staleTime: Infinity,
        });
    }
    return query;
};
