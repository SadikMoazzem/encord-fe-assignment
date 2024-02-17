import React, { useMemo } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Images from './pages/Images/Images';
import Predictions from './pages/Predictions/Predictions';
import { ImageObj, ImageRes } from './types/base-types';

const App: React.FC = () => {
    // Rather than controlling from a detached store, due to size of project, we can control the state of the tabs here
    const [currentTabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
        setTabIndex(tabIndex);
    };

    // Temporary image storage
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

    const availableImages: ImageRes = useMemo(() => {
        const images: ImageObj[] = [];

        if (selectedImage) {
            images.push({
                filename: selectedImage.name,
                size: selectedImage.size,
                uploadTime: new Date().toISOString(),
                url: URL.createObjectURL(selectedImage),
            });
        }
        return {
            result: images,
        };
    }, [selectedImage]);

    return (
        <div className="root--main-view">
            <div className="root--main-view--tabs">
                <Tabs
                    aria-label="main view tabs"
                    value={currentTabIndex}
                    onChange={handleTabChange}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Tab label="Images" />
                    <Tab label="Predictions" />
                </Tabs>
            </div>
            <div className="root--main-view--content">
                <Images
                    tabIndex={0}
                    currentTabIndex={currentTabIndex}
                    availableImages={availableImages}
                    setSelectedImage={setSelectedImage}
                    navigateToPredictions={() => setTabIndex(1)}
                />
                <Predictions tabIndex={1} currentTabIndex={currentTabIndex} />
            </div>
        </div>
    );
};

export default App;
