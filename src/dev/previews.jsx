import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Navbar from "../components/UI/Nav/Navbar";
import Loading from "../components/UI/Loading/Loading";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Loading">
                <Loading/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;