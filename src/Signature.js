import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faFont, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import "./SignatureScreen.css";

const Signature = () => {
    const [textColor, setTextColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [fontSize, setFontSize] = useState(2);
    const [markerSize, setMarkerSize] = useState(3);

    const sigCanvas = useRef({});

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const downloadSignature = () => {
        const canvas = sigCanvas.current.getCanvas();
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'signature.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    };

    const handleBgColorChange = (e) => {
        setBgColor(e.target.value);
    };

    const handleFontSizeChange = (e) => {
        const selectedFontSize = parseInt(e.target.value);
        setFontSize(selectedFontSize);
        // Increase marker size proportionally to font size
        setMarkerSize(selectedFontSize + 1);
    };

    return (
        <div id='main'>
            <div className='logo'>
                <img className='image' src="https://img.freepik.com/premium-vector/quill-signature-logo-design-inspiration_57043-204.jpg" alt="logo" />
                <h1>ONLINE SIGNATURE</h1>
            </div>

            <div id="container">
                <div className='topButton button'>
                    <select className='buttons' onChange={handleTextColorChange}>
                        <option value="#000000">Black</option>
                        <option value="#FF0000">Red</option>
                        <option value="#00FF00">Green</option>
                        <option value="#0000FF">Blue</option>
                    </select>
                    <select className='buttons' onChange={handleBgColorChange}>
                        <option value="#FFFFFF">White</option>
                        <option value="#FFC0CB">Pink</option>
                        <option value="#FFFF00">Yellow</option>
                        <option value="#808080">Gray</option>
                    </select>
                    <select className='buttons' onChange={handleFontSizeChange} value={fontSize}>
                        <option value={1}> 1 pt</option>
                        <option value={2}> 2 pt</option>
                        <option value={3}> 3 pt</option>
                        <option value={4}> 4 pt</option>
                        <option value={5}> 5 pt</option>
                        <option value={6}> 6 pt</option>
                        <option value={7}> 7 pt</option>
                        <option value={8}> 8 pt</option>
                        <option value={9}> 9 pt</option>
                    </select>
                </div>
                <div className='canva_screen' style={{ backgroundColor: bgColor, width: '100%' }}>
                    <SignatureCanvas
                        penColor={textColor}
                        canvasProps={{ className: 'sigCanvas', style: { width: '100%', maxWidth: '100%' }, height: 500 }}
                        ref={sigCanvas}
                        minWidth={1}
                        maxWidth={markerSize}
                        velocityFilterWeight={0.7}
                        style={{ width: '100%', border: '1px solid #000', fontSize: `${fontSize}rem` }}
                    />
                </div>

                <div className='bottomButton button'>
                    <button className='buttons download' onClick={downloadSignature}>
                        Download &#160;
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                    <button className='buttons delete' onClick={() => sigCanvas.current.clear()}>
                        Delete &#160;
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>

                <div className='footer'>
                    &copy; 2024 Aditya Shrivastava
                </div>
            </div>
        </div>
    );

};

export default Signature;
