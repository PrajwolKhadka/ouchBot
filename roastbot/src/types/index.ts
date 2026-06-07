export type ToneMode = 'mild'|'medium'|'savage';
export interface RoastRequest{
 image:string,
 tone: ToneMode,
 intro?: string
}
export interface RoastResponse{
    roast_msg: string,
    tone: ToneMode
}