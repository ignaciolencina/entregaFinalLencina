export class Appointment {
  constructor(
    petType,
    petName,
    ownerName,
    phoneNumber,
    description,
    date,
    time
  ) {
    this.uCode = window.self.crypto.randomUUID();
    this.petType = petType;
    this.petName = petName;
    this.ownerName = ownerName;
    this.phoneNumber = phoneNumber;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}
