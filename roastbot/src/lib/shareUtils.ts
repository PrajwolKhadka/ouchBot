import { ToneMode, RoastResponse } from "@/types";
export function encodeShareData(roast_msg: string, tone: string) {
  const encoded = btoa(roast_msg)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return `?r=${encoded}&t=${tone}`;
}

export function decodeShareData(r: string, t: string): RoastResponse {
  const decoded = atob(r.replace(/-/g, '+').replace(/_/g, '/'));
  return {
    roast_msg: decoded,
    tone: t as ToneMode
  };
}