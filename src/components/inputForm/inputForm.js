import React, {useState, useEffect} from 'react';
import {Button, Card, Form, InputGroup,} from "react-bootstrap";
import {FaMicrophone, FaResolving, FaPushed} from 'react-icons/fa';
import {SiMicrogenetics} from 'react-icons/si';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import {fetchElements} from "../../actions";
import {connect} from "react-redux";


function InputForm({dispatch, fetchElements, isLoading}) {
    const {transcript, resetTranscript} = useSpeechRecognition();
    const [input, setInput] = useState();


    useEffect(() => {
        setInput(transcript)
    }, [transcript])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
        <>
            {isLoading ?
                <div><span style={{color: "#34495e"}}>Loading ... Please wait.</span></div> :
                <>
                    <Card className={"text-center"} style={{borderRadius: 60}}>
                        <Card.Body>
                            <Form>
                                <InputGroup className="mb-3" style={{borderRadius: 60, justifyContent: "center"}}>
                                    <Form.Control as="textarea" rows={3} style={{borderRadius: 20, margin: 10, flex: 1}}
                                                  placeholder={"I want a "} value={input}
                                                  onChange={e => setInput(e.target.value)}>
                                    </Form.Control>
                                    <InputGroup.Append>
                                        <Button onClick={SpeechRecognition.startListening} variant="light"
                                                style={{borderRadius: 20, margin: 10}}><FaMicrophone color={'F19B55'}
                                                                                                     size={35}/>
                                            <div>Record</div>
                                        </Button>
                                        <Button onClick={SpeechRecognition.stopListening} variant="light"
                                                style={{borderRadius: 20, margin: 10}}><FaPushed color={'#BEBBB7'}
                                                                                                 size={35}/>
                                            <div>Stop</div>
                                        </Button>
                                        <Button onClick={resetTranscript} variant="light"
                                                style={{borderRadius: 20, margin: 10}}><FaResolving color={'#282F33'}
                                                                                                    size={35}/>
                                            <div>Reset</div>
                                        </Button>

                                    </InputGroup.Append>
                                </InputGroup>
                                <Button variant="success"
                                        style={{borderRadius: 50, backgroundColor: "#EC7A23", borderColor: "#EC7A23"}}
                                        onClick={() => fetchElements(input)}>
                                    <SiMicrogenetics color={'white'} size={35} style={{marginLeft: 5, marginRight: 8}}/>
                                    Generate
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        // explicitly forwarding arguments
        fetchElements: user => dispatch(fetchElements(user)),
    }
};

const mapStateToProps = state => {
    const {loginReducer} = state;
    const {user, isLoading, error} = loginReducer;
    return {
        userInfo: user,
        error,
        isLoading
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
