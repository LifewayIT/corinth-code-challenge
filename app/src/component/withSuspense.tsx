import {LinearProgress} from '@mui/material';
import React, {FC} from 'react';

type WithSuspense = <T>(WrappedComponent: FC<T>, FallbackComponent?: FC) => FC<T>;

export const withSuspense: WithSuspense = (WrappedComponent, FallbackComponent: FC = null) =>
    // eslint-disable-next-line react/display-name
    ({...props}) => {
        if (!FallbackComponent) {
            // eslint-disable-next-line react/display-name
            FallbackComponent = () => <LinearProgress/>;
        }
        return (
            <React.Suspense fallback={<FallbackComponent/>}>
                <WrappedComponent {...props} />
            </React.Suspense>
        );
    };
