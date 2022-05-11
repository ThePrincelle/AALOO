import { AddActionResponse } from './addActionResponse';

export interface AddActionPresenterInterface {
    presentAddAction(response: AddActionResponse): void;
}
