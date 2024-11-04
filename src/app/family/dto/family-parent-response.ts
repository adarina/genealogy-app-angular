export interface FamilyParentResponse {
  id: string; // UUID rodzica
  firstname: string; // Imię
  lastname: string; // Nazwisko
  birthDate: string; // Data urodzenia (jako string)
  relationshipType: string; // Typ relacji (np. 'father' lub 'mother')
}
