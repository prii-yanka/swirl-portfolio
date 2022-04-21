import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: "#EF8181",
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: "#EF8181",
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: "#fed46e",
        },
        '&:hover fieldset': {
            borderColor: "#8FE1F3",
        },
        '&.Mui-focused fieldset': {
            borderColor: "#EF8181",
        },
    },
});

const CssButton = styled(Button)({
    color: "#EF8181",
    backgroundColor: "#fed46e",
    '&:hover': {
        backgroundColor: "#8FE1F3",
    },
});

const ContactForm = () => {
    const [loading, setLoading] = useState(true);
    const [nameText, setNameText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [messageText, setMessageText] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    // const submit = () => {
    //     if (name && email && message) {
    //         // TODO - send mail

    //         setName('');
    //         setEmail('');
    //         setMessage('');
    //         setEmailSent(true);
    //     } else {
    //         alert('Please fill in all fields.');
    //     }
    // }
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        // const { name, email, message } = e.target.elements;
        let details = {
            name: nameText,
            email: emailText,
            message: messageText,
        };
        console.log("details: " + details.name + " " + details.email + " " + details.message);
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        // alert(result.status);
        setNameText('');
        setEmailText('');
        setMessageText('');
        setEmailSent(true);
    };

    return (
        <>
            {/* <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submit}>Send Message</button> */}
            <CssTextField
                required
                fullWidth
                label="name"
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
                value={nameText}
                onChange={(e) => setNameText(e.target.value)}
            />
            <CssTextField
                required
                fullWidth
                label="email"
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
            />
            <CssTextField
                required
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                label="your mesage"
                margin="normal"
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
            <CssButton sx={{ margin: "10px" }} disableElevation variant="contained" onClick={handleSubmit}>Submit</CssButton>
            {/* <span className={emailSent ? 'visible' : null}>Thank you for your message</span> */}
            {emailSent && <span>Thank you for your message</span>
            }
        </>
    );
}

export default ContactForm