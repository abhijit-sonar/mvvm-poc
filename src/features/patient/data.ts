import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { _patients } from "../../sample_data";

function delayed(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function usePatients(): UseQueryResult<Patient[]> {
  return useQuery({
    queryKey: ["patients-list"],
    queryFn: () => delayed(1000).then(() => _data.patients),
  });
}

export function useDeletePatients() {
  const queryClient = useQueryClient();

  const deletePatientMutation = useMutation({
    mutationFn: async (patient: Patient) => {
      const inx = _data.patients.findIndex((it) => it.id == patient.id);
      if (inx === -1) return;

      _data.patients.splice(inx, 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-list"] });
    },
  });

  return deletePatientMutation;
}

const _data = {
  patients: _patients,
};
