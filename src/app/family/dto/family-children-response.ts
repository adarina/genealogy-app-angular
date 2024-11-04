export interface FamilyChild {
  id: string; // UUID dziecka
  firstname: string; // Imię
  lastname: string; // Nazwisko
  birthDate: string; // Data urodzenia (jako string)
}

export interface FamilyChildrenResponse {
  children: FamilyChild[]; // Lista dzieci
}
