
export interface StatisticItem {
  id: string;
  content: string;
  percentage: number;
  category: "amenazas" | "oportunidades" | "fortalezas" | "debilidades" | "all";
  color: string;
}
