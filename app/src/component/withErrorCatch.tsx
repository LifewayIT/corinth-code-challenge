import {Alert, AlertTitle} from '@mui/material';
import React, {Component, ComponentType, FC} from 'react';

type ErrorCatchProps = {
    error: any;
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function withErrorCatch<T, P extends ErrorCatchProps>(
    WrappedComponent: FC<T>,
    FallbackComponent?: FC<T & P>
): ComponentType<T> {
    // eslint-disable-next-line react/display-name
    return class extends Component<T, { error?: Error }> {

        public constructor(props: T) {

            super(props);

            this.state = {
                error: null
            };

        }

        public static getDerivedStateFromError(error: Error) {
            return {error};
        }

        public componentDidCatch(error: Error) {
            this.setState({error});
        }

        public render() {
            if (!this.state.error) {
                return WrappedComponent(this.props);
            } else {
                if (FallbackComponent) {
                    return (
                        <FallbackComponent error={this.state.error} {...this.props as any}/>
                    ) as any;
                } else {
                    return (
                        <Alert severity="error">
                            <AlertTitle>{this.state.error.message}</AlertTitle>
                        </Alert>
                    );
                }
            }
        }
    };
}

