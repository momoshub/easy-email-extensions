import { BlockLayerProps } from '../../BlockLayer';
import { ExtraTab } from '../../EditPanel';
import React, { ReactNode } from 'react';
export interface ExtensionProps extends BlockLayerProps {
    categories: Array<{
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
            type: string;
            payload?: any;
            title?: string | undefined;
            onClick?: (data: any) => void;
            icon?: ReactNode;
        }>;
        displayType?: 'grid';
    } | {
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
            payload?: any;
            title?: string | undefined;
            onClick?: (data: any) => void;
            icon?: ReactNode;
        }>;
        displayType: 'column';
    } | {
        label: string;
        active?: boolean;
        key?: string;
        blocks: Array<{
            payload?: any;
            onClick?: (data: any) => void;
            icon?: ReactNode;
        }>;
        displayType: 'widget';
    } | {
        label: string;
        key?: string;
        active?: boolean;
        blocks: Array<React.ReactNode>;
        displayType: 'custom';
    }>;
    showSourceCode?: boolean;
    compact?: boolean;
    extensionActiveKey?: string[];
    onChangeExtensionActiveKey?: any;
    extraTabs?: ExtraTab[];
    thirdPartyLinks?: any[];
}
export declare const ExtensionContext: React.Context<ExtensionProps>;
export declare const ExtensionProvider: React.FC<ExtensionProps>;
export declare function useExtensionProps(): ExtensionProps;
