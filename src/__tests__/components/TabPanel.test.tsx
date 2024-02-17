import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import TabPanel from 'src/components/TabPanel/TabPanel';

describe('TabPanel', () => {
    it('should render the tab panel content when value matches index', () => {
        const { getByText } = render(
            <TabPanel index={0} value={0} label="Tab 1">
                <p>Tab 1 content</p>
            </TabPanel>,
        );
        expect(getByText('Tab 1')).toBeInTheDocument();
        expect(getByText('Tab 1 content')).toBeInTheDocument();
    });

    it('should not render the tab panel content when value does not match index', () => {
        const { queryByText } = render(
            <TabPanel index={0} value={1} label="Tab 1">
                <p>Tab 1 content</p>
            </TabPanel>,
        );

        expect(queryByText('Tab 1')).not.toBeInTheDocument();
        expect(queryByText('Tab 1 content')).not.toBeInTheDocument();
    });

    it('should apply the provided className to the tab panel content body', () => {
        const { container } = render(
            <TabPanel index={0} value={0} label="Tab 1" className="custom-class">
                <p>Tab 1 content</p>
            </TabPanel>,
        );

        const contentBody = container.querySelector('.tabpanel--content--body');
        expect(contentBody).toHaveClass('custom-class');
    });
});
