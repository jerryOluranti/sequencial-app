import { createContext } from "react";
import { useNotifications } from "../../hooks/app-hooks/useNotification";
import { UseMutationResult, useMutation } from "react-query";
import { login, register_job_seeker } from "../call-service/auth";
import { Alert } from "react-native";
import { storeAppData } from "../../helper_functions/storingAppData";
import { LoginData, RegisterData } from "../../../types";

const ApiContext = createContext<{
  useLogin: any;
  useRegister: any;
}>({
  useLogin: () => {},
  useRegister: () => {},
});

export const ApiProvider = (props: {
  children: any;
  setIsAuthenticated: any;
}) => {
  const { showNotification } = useNotifications();

  function useLogin(): UseMutationResult<any, unknown, LoginData> {
    return useMutation<any, unknown, LoginData>(
      ["login"],
      (data: LoginData) => login(data.email, data.password),
      {
        onSuccess: (res) => {
          showNotification({
            title: "Success",
            type: 1,
            message: res.data.message,
          });
          storeAppData({
            item: "token",
            value: res.data.tokens,
          });

          props.setIsAuthenticated(true);
        },
        onError: (error: any) => {
          console.log("error", error);
          showNotification({
            title: "Error",
            type: 0,
            message: error.response.data.message,
          });
          console.error(error);
        },
      }
    );
  }

  function useRegister(): UseMutationResult<any, unknown, RegisterData> {
    return useMutation<any, unknown, RegisterData>(
      ["login"],
      (data: RegisterData) =>
        register_job_seeker(
          data.email,
          data.password,
          data.full_name,
          data.phone_number,
          data.education_level,
          data.profession
        ),
      {
        onSuccess: (res) => {
          showNotification({
            title: "Success",
            type: 1,
            message: res.data.message,
          });
          setTimeout(() => {
            storeAppData({
              item: "token",
              value: res.data.tokens,
            });
          }, 1000);
          props.setIsAuthenticated(true);
        },
        onError: (error: any) => {
          console.log("error", error);
          showNotification({
            title: "Error",
            type: 0,
            message: error.response.data.message,
          });
          console.error(error);
        },
      }
    );
  }

  const callActions = {
    useLogin,
    useRegister,
  };

  return (
    <ApiContext.Provider value={callActions}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
