import './Modal.css';
import { createPortal } from 'react-dom';
import { Carrousel } from './Carrousel';

export function Modal({ setModal , prodImage}) {

    return createPortal(

        <div className="backdrop" >

            <div className="modal">
                <div className="carContainer">
                    <Carrousel  prodImage={prodImage} />
                </div>
                <div className="btnCont">
                    <button className="modBtn" onClick={() => { setModal(false) }}> X </button>
                </div>
                
            </div>
        </div>
        , document.getElementById('portal')
    );
}