import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import backendApiInstance from "@/services";

export default function usePostSurvey(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<any>,
  any
> {
  const queryClient = useQueryClient();

  const sendSurvey = (payload: any) => {
    const formData = new FormData();

    const { pdfFile, ...medicalData } = payload;


    formData.append('medicalObservations', pdfFile);
    formData.append('testResults', JSON.stringify(medicalData));

    return backendApiInstance.post("/calculator/calculate", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation({
    mutationFn: sendSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey-results"] });
    }
  });
}
