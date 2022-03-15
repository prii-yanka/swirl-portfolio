import React from 'react'
import './intro.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';


const Intro = () => {

    const introRef = useNav('Intro')

    return (
        <section className='intro' ref={introRef} id='introContainer'>
            <div>Intro</div>
        </section>
    )
}

export default Intro