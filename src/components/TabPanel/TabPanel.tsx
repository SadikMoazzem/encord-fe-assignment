import React from 'react';

import './tabpanel.scss';

type Props = {
    index: number,
    value: number,
    label: string,
    className?: string,
    children: React.ReactNode,
}
const TabPanel: React.FC<Props> = ({
    index,
    value,
    children,
    label,
    className,
}) => {
    if (value !== index) {
        return null;
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${label}`}
            aria-labelledby={`tab-${label}`}
            className="tabpanel--content"
        >
            <h1
                className="tabpanel--content--header"
            >
                {label}
            </h1>
            <div
                className={`tabpanel--content--body ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

export default TabPanel;
