export type PickKeyByType<T, U> = keyof { [P in keyof T]: T[P] extends U ? P : never };
export type NonUnderscored<S> = S extends `_${string}` ? never : S

