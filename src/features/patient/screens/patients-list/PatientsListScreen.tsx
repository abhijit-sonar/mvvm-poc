import { FC, useState } from "react";
import { usePatientsListViewModel } from "./PatientsListViewModel";
import PatientEditDialog from "../../dialogs/edit-patient/PatientEditDialog";

const PatientsListScreen: FC = () => {
  const viewModel = usePatientsListViewModel();

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      {viewModel.patients && (
        <PatientsList
          patients={viewModel.patients}
          onDeletePatient={viewModel.deletePatient}
          onEditPatient={setEditingPatient}
        />
      )}

      {editingPatient && (
        <PatientEditDialog
          patient={editingPatient}
          onSubmit={(patient) => {
            
          }}
          onClose={() => setEditingPatient(null)}
        />
      )}
    </div>
  );
};

type PatientsListProps = {
  patients: Patient[];
  onDeletePatient: (patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
};

const PatientsList: FC<PatientsListProps> = ({
  patients,
  onDeletePatient,
  onEditPatient,
}) => {
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {patients.map((patient) => (
        <PatientListItem
          key={patient.id}
          patient={patient}
          onClickDelete={() => onDeletePatient(patient)}
          onClickEdit={() => onEditPatient(patient)}
          onOpenMenu={() => setMenuOpenFor(patient.id)}
          onCloseMenu={() => setMenuOpenFor(null)}
          isMenuOpen={menuOpenFor == patient.id}
        />
      ))}
    </div>
  );
};

type PatientListItemProps = {
  patient: Patient;
  isMenuOpen: boolean;
  onClickDelete: () => void;
  onClickEdit: () => void;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

const PatientListItem: FC<PatientListItemProps> = ({
  patient,
  isMenuOpen,
  onClickDelete,
  onClickEdit,
  onOpenMenu,
  onCloseMenu,
}) => (
  <div>
    {patient.id} | {patient.name} | {patient.dateOfBirth.toString()}
    {!isMenuOpen && <button onClick={onOpenMenu}>Actions</button>}
    {isMenuOpen && (
      <>
        <button onClick={onClickDelete}>Delete</button>{" "}
        <button onClick={onClickEdit}>Edit</button>{" "}
        <button onClick={onCloseMenu}>X</button>{" "}
      </>
    )}
    <br />
  </div>
);

export default PatientsListScreen;
