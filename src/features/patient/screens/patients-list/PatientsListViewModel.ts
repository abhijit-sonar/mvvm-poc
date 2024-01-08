import { _patients } from "../../../../sample_data";
import { useDeletePatients, usePatients } from "../../data";

type PatientsListViewModel = {
  isLoading: boolean;
  patients: Patient[] | undefined;
  deletePatient: (patient: Patient) => void;
  editPatient: (patient: Patient) => void;
};

export function usePatientsListViewModel(): PatientsListViewModel {
  const { data: patients, isLoading: isPatientsLoading } = usePatients();

  const deletePatientMutation = useDeletePatients();

  const isLoading = isPatientsLoading || deletePatientMutation.isPending;

  return {
    isLoading,
    patients,
    deletePatient: deletePatientMutation.mutate,
    editPatient: () => {},
  };
}
