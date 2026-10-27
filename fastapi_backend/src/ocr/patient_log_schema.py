from typing import Literal

from pydantic import BaseModel, Field


class PatientAddressOCR(BaseModel):
    phase: int | None = Field(description="Phase number as written on the form, or null when blank.")
    package: int | None = Field(description="Package number as written on the form, or null when blank.")
    block: int | None = Field(description="Block number as written on the form, or null when blank.")
    lot: int | None = Field(description="Lot number as written on the form, or null when blank.")


class PatientDetailsOCR(BaseModel):
    name: str
    age: str
    gender: Literal["MALE", "FEMALE", ""]
    birthday: str
    address: PatientAddressOCR
    contactPerson: str
    contactNumber: str


class PatientVitalsOCR(BaseModel):
    bp: str
    pr: str
    spo2: str
    temp: str


class PatientTeamInformationOCR(BaseModel):
    ambulanceDriver: str
    responder: list[str]


class PatientTimeInformationOCR(BaseModel):
    barangayOut: str
    barangayIn: str
    hospitalIn: str
    hospitalOut: str
    odometerOut: str
    odometerIn: str


class PatientLogOCR(BaseModel):
    requestFor: Literal[
        "TRANSPORT_ASSISTANCE",
        "EMERGENCY",
        "INTER_FACILITY_TRANSFER",
        "FIRST_AID",
        "",
    ]
    date: str
    time: str
    from_: str = Field(alias="from")
    to: str
    patient: PatientDetailsOCR
    assessment: str
    vitals: PatientVitalsOCR
    dispositionType: Literal["DROP_OFF", "PICK_UP", ""]
    patientNameAndSignature: str
    guardianNameAndSignature: str
    waiver: str
    teamInformation: PatientTeamInformationOCR
    timeInformation: PatientTimeInformationOCR
    checkedBy: str
    hospitalRepresentative: str
