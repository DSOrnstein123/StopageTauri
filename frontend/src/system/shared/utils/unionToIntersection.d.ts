export type UnionToIntersection<U> = (
  U extends unknown ? (u: U) => void : never
) extends (u: infer I) => void
  ? I
  : never;
