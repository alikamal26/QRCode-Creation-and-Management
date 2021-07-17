import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import QRCode from 'qrcode.react'
import QRcode from 'qrcode';
import '../stylesheets/qrcodes.css'
import Modal from 'react-bootstrap/Modal'

export default function Qrcodes() {
    const [URL, setURL] = useState(false);
    const [URLValue, setURLValue] = useState('');
    const [restaurantValue, setRestaurantValue] = useState('');
    let data = [];
    const [dataV, setDataV] = useState(data);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [oldVal, setoldVal] = useState('');
    const [oldTemp, setOldTemp] = useState('');
    const [restaurantOldValue, setRestaurantOldValue] = useState('');
    const [restaurantOldValueTemp, setRestaurantOldValueTemp] = useState('');
    const [urlDeleted, setUrlDeleted] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [numberOfObj, setNumberOfObj] = useState(0);
    const [showFilterTextField, setShowFilterTextField] = useState(false);
    const [filterObj, setFilterObj] = useState('');

    const handleSave = (x,y) => {
        setShow(false);
        const objIndex = dataV.findIndex((obj => obj.URL == x));
        console.log(objIndex)
        dataV[objIndex].URL= oldVal
        dataV[objIndex].RestaurantValue= restaurantOldValue
        
    }
    const handleClose =() =>{
        setShow(false);
    }
    const handleGenerate = ()=>{
        setURL(false)
        let temp = {
            "URL": URLValue,
            "RestaurantValue" : restaurantValue
        }
        dataV.push(temp);
        setNumberOfObj(numberOfObj+1);
        setDataV(dataV);
        generateQRCode()
    }
    const handleDelete =(urlD)=>{
        setUrlDeleted(urlD);
        setShowDeleteModal(true);
    }
    const handleDeleteDone =(x)=>{
        setShowDeleteModal(false);
        console.log("urldeleted:", urlDeleted)
        const index = dataV.findIndex((obj=> obj.URL== urlDeleted));
        console.log("index:", index)
        dataV.splice(index,1);
        setNumberOfObj(numberOfObj-1);
    }
    const generateQRCode = async ()=>{
        try{
            const response = await QRcode.toDataURL(URLValue);
            setImageURL(response);
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <div 
            className='buttonA'
            onClick={()=> setURL(true)}
                >
                + Create new QRCode
            </div>
           {URL == true ?
           <div>
            <div className='inputDivA'>
                <div>
                <span style={{marginLeft:'20px', marginRight:'58px'}}>URL:</span>   
                <input className='inputA' onChange={(e)=>setURLValue(e.target.value)}></input>
                </div>
                <div>
                <span style={{marginLeft:'20px', marginRight:'10px'}}>Restaurant:</span>   
                <input className='inputA'onChange={(e)=>setRestaurantValue(e.target.value)}></input>
                </div>
            </div>
            
           <div 
            className='buttonGA'
            onClick={handleGenerate}
                >
                Generate QRCode
            </div>
            </div>
            :
            null
           }
           
           {numberOfObj>0 ?
           <span>
            <button className='filterButton' onClick={()=>setShowFilterTextField(!showFilterTextField)}>
                <hr></hr>
                <hr></hr>
                <hr></hr>
            </button>
            </span>
           : null}
           {showFilterTextField?
           <span>
           <input className='filterTextField' onChange={(e)=>setFilterObj(e.target.value)}></input>
           </span>
           :null}
        
         {filterObj == ''? 
         <table className='tableGA'>
        {dataV.map(elem => {
        return(
        <tr className='rowA'>
            <td className='firstColumnA'>
                <div>
                    <a href={imageURL} download>
                    <QRCode
                        className='qrcodeA'
                        value={elem.URL}
                        fgColor='#003d99'
                    />
                    </a>
                </div>
                <div >   
                    <div className='restaurantName'><b>Restaurant name</b>: {elem.RestaurantValue}</div>
                    
                    <div className='typeUrl'><b>Type</b>: url</div>
                    {/* <div><b>Short-Url</b>:</div> */}
                    <div className='urlValue'><b>URL value</b>:{elem.URL}</div>
                </div>
            </td>
            <td style={{textAlign:'center'}}>
                Scans
            </td>
            <td style={{textAlign:'center'}}>
                <div>
                <button className='editButtonA' onClick={()=>{setoldVal(elem.URL);setRestaurantOldValue(elem.RestaurantValue); setRestaurantOldValueTemp(elem.RestaurantValue) ;setShow(true); setOldTemp(elem.URL)}}>Edit</button>
                </div>
                <div>
                <button className='deleteButton' onClick={()=>handleDelete(elem.URL)}>Delete</button>
                </div>
            </td>
        </tr>
        )
        })}
         </table>    
        :
        <table className='tableGA'>
        {dataV.filter(temp=> temp.RestaurantValue== filterObj).map(elem => {
            return(
            <tr className='rowA'>
                <td className='firstColumnA'>
                    <div>
                        <a href={imageURL} download>
                        <QRCode
                            className='qrcodeA'
                            value={elem.URL}
                            fgColor='#003d99'
                        />
                        </a>
                    </div>
                    <div >   
                        <div className='restaurantName'><b>Restaurant name</b>: {elem.RestaurantValue}</div>
                        
                        <div className='typeUrl'><b>Type</b>: url</div>
                        {/* <div><b>Short-Url</b>:</div> */}
                        <div className='urlValue'><b>URL value</b>:{elem.URL}</div>
                    </div>
                </td>
                <td style={{textAlign:'center'}}>
                    Scans
                </td>
                <td style={{textAlign:'center'}}>
                    <div>
                    <button className='editButtonA' onClick={()=>{setoldVal(elem.URL);setRestaurantOldValue(elem.RestaurantValue); setRestaurantOldValueTemp(elem.RestaurantValue) ;setShow(true); setOldTemp(elem.URL)}}>Edit</button>
                    </div>
                    <div>
                    <button className='deleteButton' onClick={()=>handleDelete(elem.URL)}>Delete</button>
                    </div>
                </td>
            </tr>
            )
            })}
            </table>
    }
       
         <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Edit url</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:'rgb(238, 238, 238)'}}>
                <div>
                    <div className='urlName'>Url</div>
                    <input className='inputEdit' value={oldVal} onChange={(e)=>setoldVal(e.target.value)}></input>
                    <div className='urlName' style={{paddingTop:'5px'}}>Restaurant Name</div>
                    <input className='inputEdit' value={restaurantOldValue} onChange={(e)=>setRestaurantOldValue(e.target.value)}></input>
                </div>
            
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'rgb(238, 238, 238)'}}>
                <button className='cancelButton' onClick={handleClose}>
                    Cancel
                </button>
                <button className='saveButton' onClick={()=>handleSave(oldTemp, restaurantOldValueTemp)}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>

       
        <Modal show={showDeleteModal} onHide={()=> setShowDeleteModal(false)} className='m'>
            <Modal.Header style={{justifyContent:'center'}}>
                <Modal.Title style={{fontWeight:'bold'}}>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{textAlign:'center'}}> Are you sure you want to delete? </div>
            </Modal.Body>
            <Modal.Footer style={{justifyContent:'center'}}>
                <button className='yesNoButton' onClick={handleDeleteDone}>Yes</button>
                <button className='yesNoButton' onClick={()=>setShowDeleteModal(false)}>No</button>
            </Modal.Footer>
        </Modal>       
        </div>
    )
}
