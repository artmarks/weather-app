import Head from 'next/head';
import {FaGithub} from 'react-icons/fa'
import { HEADER_NAME } from './generalConstants';


export function Footer(){
    return (
            <footer className="bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center w-full h-24 border-t">
                <a
                    className="flex items-center justify-center"
                    href="https://github.com/artmarks/music-helper"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <div className='text-5xl'><FaGithub/></div>
                </a>
            </footer>
        );
}

export function Header(){
    return ( 
        <Head>
        <title>{HEADER_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://js.arcgis.com/4.21/@arcgis/core/assets/esri/themes/light/main.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://js.arcgis.com/4.11/dijit/themes/claro/claro.css"></link>‍

      </Head>
    );
}
