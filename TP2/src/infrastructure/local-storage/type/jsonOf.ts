// type FilterFlags<Base, Condition> = {
//   [Key in keyof Base]: Base[Key] extends Condition ? Key : never
// };
// type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
// type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

import { ItemType } from '../../../domain/model';

type NotFilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
};
type NotAllowedNames<Base, Condition> = NotFilterFlags<
    Base,
    Condition
>[keyof Base];
type ExcludeType<Base, Condition> = Pick<
    Base,
    NotAllowedNames<Base, Condition>
>;

type JsonScalarType<T> = T extends ItemType
    ? ItemType
    : T extends number
    ? number
    : T extends number
    ? number
    : T extends Date
    ? string
    : T extends boolean
    ? boolean
    : T extends object
    ? JsonObjectType<T>
    : JsonObjectType<T>;

type JsonObjectType<Base> = {
    [Key in keyof Base]: JsonScalarType<Base[Key]>;
};
// tslint:disable-next-line
export type JsonOf<T> = JsonObjectType<ExcludeType<T, Function>>;
