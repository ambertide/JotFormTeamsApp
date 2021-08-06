export default interface JotFormMetadata {
  id: string;
  title: string;
  url: string;
  status: "ENABLED" | "DISABLED";
  created_at: string;
  updated_at: string;
  count: number;
}