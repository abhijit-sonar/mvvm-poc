import { FC, useState } from "react";

export type PatientEditDialogProps = {
  patient: Patient;
  onSubmit: (values: FormValues) => void;
  onClose: () => void;
};

export type FormValues = {
  name: string;
  dob: string;
};

const PatientEditDialog: FC<PatientEditDialogProps> = ({
  patient,
  onSubmit,
  onClose,
}) => {
  // TODO: Use formik here
  const [name, setName] = useState(patient.name);
  const [dob, setDob] = useState(patient.dateOfBirth.toString());

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        Name:{" "}
        <input
          placeholder="patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        DOB:{" "}
        <input
          type="date"
          placeholder="patient DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <button
        onClick={() =>
          onSubmit({
            name,
            dob,
          })
        }
      >
        Submit
      </button>

      <button
        onClick={ onClose}
      >
        Close
      </button>
    </div>
  );
};

export default PatientEditDialog;
