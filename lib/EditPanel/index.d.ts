import { ReactNode } from 'react';
export declare type ExtraTab = {
    title: string;
    showInPreviewMode?: boolean;
    content: ReactNode;
    key?: string;
};
export declare function EditPanel({ showSourceCode, extraTabs, activeTab, }: {
    showSourceCode: boolean;
    extraTabs?: ExtraTab[];
    activeTab?: string;
}): JSX.Element;
