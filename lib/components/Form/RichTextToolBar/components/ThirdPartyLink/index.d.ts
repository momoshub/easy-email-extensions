import { PopoverProps } from '@arco-design/web-react';
export interface LinkParams {
    link: string;
    blank: boolean;
    underline: boolean;
    linkNode: HTMLAnchorElement | null;
    linkType?: string;
}
export interface LinkProps extends PopoverProps {
    currentRange: Range | null | undefined;
    onChange: (val: LinkParams) => void;
}
export declare function ThirdPartyLink(props: LinkProps): JSX.Element;
