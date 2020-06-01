import React from 'react';

export interface IUnitsProps {
    offset: number;
    title: string;
    subtitle?: string;
    text?: string;
    experienceTimeinterval?: string;
    width?: number;
    accent?: boolean;
}

export interface IPreviewCardProps {
    prop1: boolean;
    id: string;
    title: string;
    subtitle?: string;
    text?: string;
    chips?: string[];
    units?: IUnitsProps[];
    img?: string;

}

declare const PreviewCard: React.FC<IPreviewCardProps>;

export default PreviewCard;
