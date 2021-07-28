import React from 'react'

// Material UI
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// Animation
import LottieControl from '../animation/LottieControl.jsx'
import errorJson from '../animation/error.json';

function Page404() {
    return (
        <Container>
            <LottieControl animation={errorJson} width='55%'/>
            <div className="flex-box">
                <Link to={'/dashboard'}><Button>Back to safety</Button></Link>
            </div>
        </ Container>
    )
}

export default Page404;