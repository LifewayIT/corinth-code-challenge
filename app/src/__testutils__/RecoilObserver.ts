import {RecoilValue, useRecoilValue} from "recoil";
import React, {FunctionComponent, useEffect} from "react";

type RecoilObserverProps = {
    node: RecoilValue<any>;
    onChange: (value: any) => void;
};

export const RecoilObserver: FunctionComponent<RecoilObserverProps> = ({node, onChange}) => {
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
};
