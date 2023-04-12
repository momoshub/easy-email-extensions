import { ReactNode } from 'react';
export declare type ExtraTab = {
    title: string;
    content: ReactNode;
    key?: string;
};
export declare function EditPanel({ showSourceCode, extraTabs, }: {
    showSourceCode: boolean;
    extraTabs?: ExtraTab[];
}): JSX.Element;
